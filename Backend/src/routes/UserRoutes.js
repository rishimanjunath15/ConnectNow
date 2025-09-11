import { Router } from "express";
import { login, register } from "../controllers/UserController.js";
import { addActivity, getAllActivity } from "../controllers/ActivityController.js";

const router =Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/addActivity").post(addActivity);
router.route("/getAllActivity").get(getAllActivity);

// Test endpoint for connection checking
router.route("/test").get((req, res) => {
    res.status(200).json({
        status: "success",
        message: "Server is running",
        timestamp: new Date().toISOString()
    });
});

export default router;

