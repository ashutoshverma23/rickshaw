import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MongoDBURI,);
        console.log('MongoDB Connection Successfull');
    } catch (error) {
        console.log('Error connecting to MongoDB: ', error.message);
    }
}

export default connectDB;