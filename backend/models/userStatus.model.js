import mongoose from 'mongoose';

const userStatusSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'userType'
    },
    userType: {
        type: String,
        required: true,
        enum: ['driver', 'passenger']
    },
    isActive: {
        type: Boolean,
        default: false
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    }
}, { timestamps: true });

userStatusSchema.index({ location: '2dsphere' });

const UserStatus = mongoose.model('UserStatus', userStatusSchema);

export default UserStatus;
