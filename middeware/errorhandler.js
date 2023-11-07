const errorHandler = (err,req,res,next) => {

    err.message =  err.message || "Internal server error";
    err.statuscode = err.statuscode || 500;

    if(err.code  === 11000){
        err.message = "Duplicate key error!!!";
        err.statuscode = 400;
    }

    res.status(err.statuscode).json({
        message : err.message
    });

}
module.exports = errorHandler;