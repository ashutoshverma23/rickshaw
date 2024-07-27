import bcrypt from 'bcryptjs';
import Driver from '../models/driver.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import { createTransporter } from './email.controller.js';

// Register controller
export const register = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword, licensePlate } = req.body;
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

        // Create a new Driver
        const newDriver = new Driver({
            fullName,
            email,
            password: hashedPassword,
            licensePlate,
            verificationToken,
        });

        if (newDriver) {
            generateTokenAndSetCookie(newDriver._id, res);

            await newDriver.save();

        }
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
            mesage: 'Driver registered successfully. Please check your email to verify your account.',
        })
    } catch (error) {
        // Handle any errors
        console.log("Error in register controller", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email is registered
        const Driver = await Driver.findOne({ email });
        if (!Driver) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, Driver.password || "");
        if (!Driver || !isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        generateTokenAndSetCookie(Driver._id, res);

        res.status(200).json({
            _id: Driver._id,
            fullName: Driver.fullName,
            email: Driver.email,
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

// get all drivers
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const passenger = await Passenger.findOne({ verificationToken: token });
        if (!passenger) {
            return res.status(404).json({ message: 'Invalid verification token' });
        }

        passenger.isVerified = true;
        passenger.verificationToken = undefined;
        await passenger.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.log("Error in email verification", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.status(200).json(drivers);
    } catch (error) {
        console.log("Error in get all drivers", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}