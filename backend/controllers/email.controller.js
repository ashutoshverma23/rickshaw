import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import { verifyEmailForModel } from '../middleware/verifyEmailForModel.js';
import Passenger from '../models/passenger.model.js';
import Driver from '../models/driver.model.js';

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'  // Ensure this URL is correct
);

// Set the refresh token
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// Create Nodemailer transporter
export const createTransporter = async () => {
    try {
        const accessToken = await oauth2Client.getAccessToken();
        if (!accessToken) {
            throw new Error('Failed to create access token');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'ashutoshrgnict@gmail.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken.token,  // Ensure token is accessed correctly
            },
        });

        return transporter;
    } catch (error) {
        console.error('Error in createTransporter:', error.message);
        throw error;
    }
};

export const verifyPassengerEmail = async (req, res) => {
    verifyEmailForModel(req, res, Passenger);
}

export const verifyDriverEmail = async (req, res) => {
    verifyEmailForModel(req, res, Driver);
}


