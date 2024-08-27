class CustomError extends Error{
    constructor(message,statusCode){
        //Calling base class constructor
        super(message)
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error'
        this.isOperational = true ,
        //Stack Trace
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = CustomError;


// new CustomError("Wrong Password", 404)