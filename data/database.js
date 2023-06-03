import mongoose from "mongoose"

export const connectDB = () => {
    mongoose
    .connect(process.env.MONGO_URI, {dbName: "NodeAPI"})
    .then(() => {console.log("DataBase Connected")})
    .catch((e) => {console.log(e)})
};

