export const verifyEmailForModel = async (req, res, Model) => {
    try {
        const { token } = req.params;

        const user = await Model.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: 'Invalid verification token' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.log("Error in email verification", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
