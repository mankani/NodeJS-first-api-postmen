
class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);         //super is constructor of parent class(here error)
        this.statusCode = statusCode;
    }
}

export const errorMiddleWare = (err, req, res, next) => {
    // console.log(err);
    err.message = err.message || "Internal server error";   // used if we do not define error  message
    err.statusCode = err.statusCode || 500;     //500 is internal server error
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,

    });
}

export default ErrorHandler;