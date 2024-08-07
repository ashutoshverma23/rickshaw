import bcrypt from 'bcryptjs';
import Driver from '../models/driver.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import { createTransporter } from './email.controller.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// Register controller
export const register = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword, licensePlate } = req.body;
        let drivingLicenseImagePath = '';

        if (req.files && req.files.drivingLicense) {
            const file = req.files.drivingLicense;
            try {
                const result = await cloudinary.uploader.upload(file.tempFilePath);
                drivingLicenseImagePath = result.secure_url;
            } catch (err) {
                console.log("Error in cloudinary", err.message);
                return res.status(500).json({ message: 'Error uploading driving license' });
            }
        }

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if the email is already registered
        const existingDriver = await Driver.findOne({ email });
        if (existingDriver) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new driver
        const newDriver = new Driver({
            fullName,
            email,
            password: hashedPassword,
            licensePlate,
            verificationToken,
            drivingLicenseImagePath,
        });

        await newDriver.save();
        generateTokenAndSetCookie(newDriver._id, res);

        const transporter = await createTransporter();
        await transporter.sendMail({
            from: 'ashutoshrgnict@gmail.com',
            to: email,
            subject: 'Email Verification',
            html: `Click <a href="http://localhost:3000/verify-email/${verificationToken}">here</a> to verify your email.`,
        });

        res.status(201).json({
            _id: newDriver._id,
            fullName: newDriver.fullName,
            email: newDriver.email,
            message: 'Driver registered successfully. Please check your email to verify your account.',
        });
    } catch (error) {
        console.log("Error in register controller", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email is registered
        const driver = await Driver.findOne({ email });
        if (!driver) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, driver.password || "");
        if (!driver || !isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        generateTokenAndSetCookie(driver._id, res);

        res.status(200).json({
            _id: driver._id,
            fullName: driver.fullName,
            email: driver.email,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const logout = async (_, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error on logout", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.status(200).json(drivers);
    } catch (error) {
        console.log("Error in get all drivers", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const getDriverProfile = async (req, res) => {
    try {
        const driver = await Driver.findById(req.user._id);
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.status(200).json(driver);
    } catch (error) {
        console.log("Error in getProfile controller", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}