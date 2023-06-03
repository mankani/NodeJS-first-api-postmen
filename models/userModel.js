import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
})

export const User = mongoose.model("newUser", userschema);