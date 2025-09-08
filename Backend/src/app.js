import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/SocketManager.js";

import cors from "cors";
import userRoutes from "./routes/UserRoutes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8001))

// CORS configuration
const corsOptions = {
    origin: ["http://localhost:3000", "https://video-conferencing-mern-webrtc-6.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"]
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Handle preflight requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin');
    res.header('Access-Control-Allow-Credentials', true);
    res.sendStatus(200);
});

app.use("/api/v1/users", userRoutes);

const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb+srv://imdigitalashish:imdigitalashish@cluster0.cujabk4.mongodb.net/")

    console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log("LISTENING ON PORT 8001")
    });



}



start();