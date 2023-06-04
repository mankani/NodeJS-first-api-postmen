import { User } from "../models/userModel.js";
import bcrypt, { hash } from "bcrypt";
import jwt  from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getUserAll = async (req, res, next) => {
    try {
        const users = await User.find();
        
        res.json({
            success: true,
            users: users,       // key value pair same so only users can be writeen 
        })

    } catch (error) {
        next(error);
    }
}

export const getMyProfile = (req, res) => {
    res.json({
        success: true,
        user: req.user
    })
}

export const logout = (req, res) => {
    res
    .cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    .json({
        success: true,
        message: "Logged out succesfully"
    })
}

export const register = async (req, res,next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
    
        let user = await User.findOne({email})
    
        if(user) return next(new ErrorHandler("User already exist", 400));
        
        user = await User.create({
            username,
            email,
            password: hashedPassword
        });
    
        sendCookie(user, res, "Registered Succesfully", 201);
        
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({email}).select("+password");
    
        if(!user) return next(new ErrorHandler("Invalid Email or Password", 400));    //400 is bad request
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if(!isMatch) return next(new ErrorHandler("Invalid Password", 400));
        
        sendCookie(user, res, `Welcome ${user.username}`, 200)
        
    } catch (error) {
        next(error);
    }

}