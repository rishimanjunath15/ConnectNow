import httpStatus from "http-status";
import { User } from "../models/User.js";
import { Meeting } from "../models/Meeting.Model.js";

const addActivity = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        // Validate input
        if (!token || !meeting_code) {
            return res.status(httpStatus.BAD_REQUEST).json({ 
                message: "Token and meeting code are required" 
            });
        }

        const user = await User.findOne({ token: token });
        
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ 
                message: "User not found" 
            });
        }

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code,
        });

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({ 
            message: "Added code to history" 
        });
    } catch (e) {
        console.error("Error adding activity:", e);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ 
            message: `Something went wrong: ${e.message}` 
        });
    }
};

const getAllActivity = async (req, res) => {
    const { token } = req.query;
    
    try {
        // Validate input
        if (!token) {
            return res.status(httpStatus.BAD_REQUEST).json({ 
                message: "Token is required" 
            });
        }

        const user = await User.findOne({ token: token });
        
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ 
                message: "User not found" 
            });
        }

        const meetings = await Meeting.find({ user_id: user.username });
        
        res.status(httpStatus.OK).json(meetings);
    } catch (e) {
        console.error("Error getting activities:", e);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ 
            message: `Something went wrong: ${e.message}` 
        });
    }
};

export { addActivity, getAllActivity };