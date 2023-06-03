import express from "express"
import userRouter from "./routes/userRoute.js";     //import by any name since export default is used
import dotenv from "dotenv";

const config = dotenv.config;

export const app = express();

config({
    path: "./data/config.env"
})

//using middleware
app.use(express.json())             // to work req.body in third party(postman)
app.use("/users" ,userRouter);      //adding "users" prefix before the url , this is a router property

app.get("/", (req, res) => {
    res.send("app is working");
})
