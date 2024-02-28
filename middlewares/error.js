// const handleCastErrorDB = () => {
//     const message = `Invalid ${err.path}: ${err.value}.`;
//     return new AppError(message, 400);
//   };


// When a unique value is being repeated
const handleDuplicateValueError = (err) => {
    const dupKey = Object.keys(err.keyValue)[0];
    const dupValue = Object.values(err.keyValue)[0];
    
    const message = `${dupKey} with value "${dupValue}"  exist already`;
    const error = new Error(message);
    error.statusCode = 400;
    return error
}


// errors for development comes here 
const sendDevError = (err, res) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        status: "faIL",
        message: errMsg,
        stack: err.stack,
        error: err
    })
}


// Errors for production comes here
const sendProdError = (err, res) => {
    
    if (err.code == 11000) {
        const error = handleDuplicateValueError(err);
        console.log(error);
        res.status(error.statusCode).json({
            status: "faIL",
            message: error.message,
        })
    }

    else if (err.name == "ValidationError") {

    }

    else if (err.name == 'CastError') {

    }
    else {
        res.status(500).json({
            status: "error",
            message: "Something went wrong"
        })
    }
}


// All errors middlewear
const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV == "development") {
        
        sendDevError(err, res)
    }
    else {
        sendProdError(err, res)
    }
    next();
}

module.exports = errorHandler;

