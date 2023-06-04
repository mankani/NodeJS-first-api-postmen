import jwt from "jsonwebtoken";

export const sendCookie= (user, res, message, statuscode = 200) =>{    
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
    res
    .status(statuscode)
    // In deployment we need (sameSite: "none" and secure: true)
    // but in postman (sameSite: "lax" && secure: false)
    .cookie("token", token,{
        httpOnly: true,
        maxAge: 15*60*60*1000,      //15 min
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",   // by default it is lax
        secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
        success: true,
        message 
    })

}