import { Router } from "express";
import { login, register } from "../controllers/UserController.js";
import { addActivity, getAllActivity } from "../controllers/ActivityController.js";

const router =Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/addActivity").post(addActivity);

router.route("/getAllActivity").get(getAllActivity);


export default router;

