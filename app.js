import express from "express"
import userRouter from "./routes/userRoute.js";     //import by any name since export default is used
import taskRouter from "./routes/taskRoute.js";     //import by any name since export default is used
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/error.js";
import cors from "cors";


const config = dotenv.config;

export const app = express();

config({
    path: "./data/config.env"
})

//using middleware
app.use(express.json());            // to work req.body in third party(postman)
app.use(cookieParser());            //we can use cookies now
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// using routes with indication that we are using api with version 1
app.use("/api/v1/users" ,userRouter);      //adding "users" prefix before the url , this is a router property
app.use("/api/v1/tasks", taskRouter);


app.get("/", (req, res) => {
    res.send("app is working");
})

// using error middleware
app.use(errorMiddleWare);
