import jwt from "jsonwebtoken";

export const sendCookie= (user, res, message, statuscode = 200) =>{    
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
    res
    .status(statuscode)
    .cookie("token", token,{
        httpOnly: true,
        maxAge: 15*60*60*1000      //15 min
    })
    .json({
        success: true,
        message 
    })

}