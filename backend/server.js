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

app.use(fileUpload({
    useTempFiles: true,
}));

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000/",
}));
app.use(express.json());
dotenv.config();

app.use("/api/passenger", passengerRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/user-status", userStatusRoutes);

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});




