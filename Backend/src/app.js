import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/SocketManager.js";
import cors from "cors";
import userRoutes from "./routes/UserRoutes.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

// Get configuration from environment variables
app.set("port", process.env.PORT || 8001);

// CORS configuration
const corsOrigins = [
    process.env.CORS_ORIGIN_1 || "http://localhost:3000",
    process.env.CORS_ORIGIN_2 || "http://localhost:3001",
    process.env.CORS_ORIGIN_PROD || "https://yourdomain.com"
];

const corsOptions = {
    origin: corsOrigins,
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
    try {
        // Connect to MongoDB using environment variable
        const mongoUrl = process.env.MONGODB_URI || "mongodb+srv://imdigitalashish:imdigitalashish@cluster0.cujabk4.mongodb.net/";
        const connectionDb = await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "connectnow"
        });

        console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`)
        
        const PORT = app.get("port");
        
        // Create a function to try starting the server on a port
        const tryStartServer = (port) => {
            return new Promise((resolve, reject) => {
                const testServer = server.listen(port, "0.0.0.0", () => {
                    console.log(`\n✅ BACKEND STARTED SUCCESSFULLY!`)
                    console.log(`📡 Server listening on port ${port}`)
                    console.log(`🌍 Local: http://localhost:${port}`)
                    console.log(`📊 MongoDB: Connected`)
                    console.log(`🚀 Socket.IO: Ready for connections`)
                    console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}\n`)
                    resolve(port);
                });
                
                testServer.on('error', (error) => {
                    if (error.code === 'EADDRINUSE') {
                        reject(error);
                    } else {
                        console.error(`❌ Server error:`, error);
                        reject(error);
                    }
                });
            });
        };

        // Try starting on the default port first
        try {
            await tryStartServer(PORT);
        } catch (error) {
            if (error.code === 'EADDRINUSE') {
                console.log(`❌ Port ${PORT} is already in use!`);
                console.log(`💡 Trying alternative ports...`);
                
                // Try alternative ports
                const alternativePorts = [8002, 8003, 8004, 8005, 8006];
                let started = false;
                
                for (const altPort of alternativePorts) {
                    try {
                        await tryStartServer(altPort);
                        console.log(`⚠️  IMPORTANT: Frontend needs to be updated!`);
                        console.log(`� Update environment.js to use port ${altPort}`);
                        console.log(`🔧 Or use the automated connection setup in the frontend`);
                        started = true;
                        break;
                    } catch (err) {
                        if (err.code !== 'EADDRINUSE') {
                            throw err;
                        }
                        console.log(`Port ${altPort} also in use, trying next...`);
                    }
                }
                
                if (!started) {
                    console.log(`❌ No available ports found in range 8001-8006`);
                    console.log(`🔧 Please stop other services or restart your computer`);
                    process.exit(1);
                }
            } else {
                throw error;
            }
        }

        // Graceful shutdown handlers
        const gracefulShutdown = () => {
            console.log('\n👋 Shutting down gracefully...');
            server.close(() => {
                console.log('✅ Server closed');
                process.exit(0);
            });
        };

        process.on('SIGTERM', gracefulShutdown);
        process.on('SIGINT', gracefulShutdown);

    } catch (error) {
        console.error(`❌ Failed to start server:`, error.message);
        console.error(`🔍 Full error:`, error);
        process.exit(1);
    }
}



start();