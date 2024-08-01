import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/conn.js";
import passengerRoutes from "./routes/passenger.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import userStatusRoutes from "./routes/userStatus.routes.js";
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server);

dotenv.config();
app.use(fileUpload({
    useTempFiles: true,
}));

app.use(cookieParser());

app.use(cors({
    origin: ["https://rickshaw.vercel.app", "http://localhost:3000"],
    credentials: true,
}));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("API is running");
});
app.use("/api/passenger", passengerRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/user-status", userStatusRoutes);

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});




