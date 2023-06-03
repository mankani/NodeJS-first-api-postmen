import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getUserAll = async (req, res) => {
    
    const users = await User.find();
    
    // returns query given in params keyword and value
    // console.log(req.query);
    const keyword = req.query.keyword;
    // console.log(keyword);
    
    res.json({
        success: true,
        users: users,       // key value pair same so only users can be writeen 
    })
}

export const getUserDetails = async (req, res) => {
    // const {id} = req.body;
    
    // const {id}= req.query         // given id is keyword in params
    // console.log(req.params);        //returns empty if static way used
    
    const {id} = req.params;
    const user = await User.findById(id);
    // console.log(user);
    res.json({
        success: true,
        user,
    });
}
export const updateUserDetails = async (req, res) => {
    res.json({
        success: true,
        message: "updated",
    });
}
export const deleteUserDetails = async (req, res) => {
    res.json({
        success: true,
        message: "deleted",
    });
}

export const specialFunc = (req,res) => {
    res.json({
        success: true,
        message: "Working"
    })
}

export const register = async (req, res) => {
    
    const { username, email, password } = req.body;
    
    const hashedPassword = await bcrypt.hash("password",10)

    await User.create({
        // username: req.body.name, or username: name,   => not working
        username,
        email,
        password: hashedPassword,
    });
    
    res.status(201).cookie("Temp", "This is fun").json({
        success: true,
        message: "Signed Up Successfully",
    })
}