import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Passenger from '../models/passenger.model.js'
import Driver from '../models/driver.model.js'


dotenv.config()

const authenticate = async (req, res, next) => {

    const token = req.cookies.jwt;
    console.log("Token in auth middleware", token);

    if (!token) {
        return res.status(401).json({ message: 'Please authenticate.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "58BQgyvWqGt8rP5mQWXtPBXLmLeJ/lJtLXTuQab7BaI=");

        console.log("Decoded token", decoded);

        let user = await Driver.findById(decoded.userId);

        if (!user) {
            user = await Passenger.findById(decoded.userId);
        }

        if (!user) {
            return res.status(401).json({ message: 'Please authenticate.' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in authentication middleware", error.message);
        res.status(401).json({ message: 'Please authenticate.' });
    }
};

export default authenticate;