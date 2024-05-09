class ErrorHandler extends Error{
    constructor(message,statusCode)
    {
        super(message);
        this.statusCode=statusCode;
    }
}

export const errorMiddleware=(err,req,res,next)=>{
   // let message,statusCode;
    err.message=err.message||"Internal server error";
    err.statusCode=err.statusCode||500;

    if(err.name==='CastError')
    {
        const message=`resource not found ${err.path}`;
        err=new ErrorHandler(message,400);
    }
    if(err.code===11000)
    {
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
        err=new ErrorHandler(message,400);
    }
    if(err.name==='JsonWebTokenError')
    {
        const message=`Jsonwebtoken is invalid.Try again`;
        err=new ErrorHandler(message,400);
    }
    if(err.name==='TokenExpiredError')
    {
        const message=`Json web token is expired. try error`;
        err=new ErrorHandler(message,400);
    }
    return res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
    
}

export default ErrorHandler;