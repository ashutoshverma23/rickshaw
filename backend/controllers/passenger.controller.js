import bcrypt from 'bcryptjs';
import Passenger from '../models/passenger.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import { createTransporter } from './email.controller.js';

// Register controller
export const register = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if the email is already registered
        const existingPassenger = await Passenger.findOne({ email });
        if (existingPassenger) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new passenger
        const newPassenger = new Passenger({
            fullName,
            email,
            password: hashedPassword,
            verificationToken,
        });

        if (newPassenger) {
            generateTokenAndSetCookie(newPassenger._id, res);

            await newPassenger.save();
        }

        const transporter = await createTransporter();
        await transporter.sendMail({
            from: 'ashutoshrgnict@gmail.com',
            to: email,
            subject: 'Email Verification',
            html: `Click <a href="http://localhost:3000/verify-email/${verificationToken}">here</a> to verify your email.`,
        });

        res.status(201).json({
            _id: newPassenger._id,
            fullName: newPassenger.fullName,
            email: newPassenger.email,
            message: 'Passenger registered successfully. Please check your email to verify your account.',
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
        const passenger = await Passenger.findOne({ email });
        if (!passenger) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, passenger.password || "");
        if (!passenger || !isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        generateTokenAndSetCookie(passenger._id, res);

        res.status(200).json({
            _id: passenger._id,
            fullName: passenger.fullName,
            email: passenger.email,
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

// get all passengers
export const getAllPassengers = async (req, res) => {
    try {
        const passengers = await Passenger.find();
        res.status(200).json(passengers);
    } catch (error) {
        console.log("Error in get all passengers", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getPassengerProfile = async (req, res) => {
    try {
        const passenger = await Passenger.findById(req.user._id);
        if (!passenger) {
            return res.status(404).json({ message: 'Passenger not found' });
        }
        res.status(200).json(passenger);
    } catch (error) {
        console.log("Error in get passenger profile", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}