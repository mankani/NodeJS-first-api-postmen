import express from "express";
// import { User } from "../models/userModel.js";
import { deleteUserDetails, getUserAll, getUserDetails, register, specialFunc, updateUserDetails } from "../controllers/userController.js";

const router = express.Router();

//getting all users information
router.get("/all", getUserAll);

//takes special as separate url not as ID therefore run
router.get("/userId/special", specialFunc)

// getting user details in dynamic route: dynamic way of giving id in url 
router.route("/userId/:id")
    .get(getUserDetails)
    .put(updateUserDetails)
    .delete(deleteUserDetails)

//     since url same so yes this below lines can be written as written above
// router.get("/userId/:id", getUserDetails);
// router.put("/userId/:id", updateUserDetails);
// router.delete("/userId/:id", deleteUserDetails);




//takes special as ID therefore gives error since special is not an ID
router.get("/userId/special", specialFunc)

//register or collecting user info from user
router.post("/new", register)

export default router;