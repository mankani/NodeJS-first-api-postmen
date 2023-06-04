import express from "express";
// import { User } from "../models/userModel.js";
import {getMyProfile, getUserAll, login, logout, register} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//getting all users information
router.get("/all", getUserAll);

router.route("/profile")
    .get(isAuthenticated, getMyProfile);
// router.get("/profile", isAuthenticated, getMyProfile);

router.get("/logout", logout);

//register or collecting user info from user
router.post("/new", register);

// if already registered then login
router.post("/login", login);


export default router;