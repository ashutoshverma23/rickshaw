import UserStatus from '../models/userStatus.model.js';

export const updateStatus = async (req, res) => {
    const { userId, userType, isActive, latitude, longitude } = req.body;

    try {
        const userStatus = await UserStatus.findOneAndUpdate(
            { userId },
            { userType, isActive, location: { type: 'Point', coordinates: [longitude, latitude] } },
            { new: true, upsert: true }
        );

        res.json(userStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch active users
export const getActiveUsers = async (req, res) => {
    try {
        const activeUsers = await UserStatus.find({ isActive: true });
        res.json(activeUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
