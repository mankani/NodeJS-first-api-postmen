import express from "express";
import { deleteTasks, getMyTasks, newTask, updateTasks } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/mytask", isAuthenticated, getMyTasks);

router.post("/new", isAuthenticated, newTask);

//have to put under bc after / everything is considered id, in above case my new and mytask are not id
router.route("/:id")
    .put(updateTasks)
    .delete(deleteTasks);


export default router;