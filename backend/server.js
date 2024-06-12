import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/conn.js";
import passengerRoutes from "./routes/passenger.routes.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
dotenv.config();

app.use("/passenger", passengerRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});




