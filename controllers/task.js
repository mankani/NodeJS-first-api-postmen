import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/taskModel.js";

export const newTask = async (req, res, next) => {
    try {
        const {title, description} = req.body;
        
        await Task.create({
            title,
            description,
            user: req.user
        })
        
        res.status(201).json({
            success: true,
            message: "Task added successfully"
        })

    } catch (error) {
        next(error);
    }
}

export const getMyTasks = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({user: userId})
        res.status(200).json({
            success: true,
            tasks,
        })
        
    } catch (error) {
        next(error);
    }
}

export const updateTasks = async(req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        
        if(!task) return next(new ErrorHandler("This is an error", 404));
        task.isCompleted = !task.isCompleted;
        await task.save();
    
        res.status(200).json({
            success: true,
            message: "Task Updated!",
        })
        
    } catch (error) {
        next(error);
    }
};
export const deleteTasks = async(req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        
        //we user our own error handler class since in default 'Error' class we cant put parameter other than message
        if(!task) return next(new ErrorHandler());  //if left empty gives, internal server error
        if(!task) return next(new ErrorHandler("This is an error", 404));
        await task.deleteOne();
        
        res.status(200).json({
            success: true,
            message: "Task Deleted!",
        })
        
    } catch (error) {
        next(error);
    }

};