import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
},
    {
        timestamps: true
    }
);

const Passenger = mongoose.model('Passenger', passengerSchema)
export default Passenger

