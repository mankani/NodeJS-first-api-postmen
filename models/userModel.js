import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    createAt: {
        type:  Date,
        default: Date.now()
        // default: new Date(Date.now()).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
        // default: moment(Date.now()).tz("Asia/Kolkata")
    }
})

export const User = mongoose.model("UserProject", userschema);