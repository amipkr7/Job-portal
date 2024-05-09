import { catchAsyncError } from "./catchAsyncError.js"
import ErrorHandler from './error.js'
import jwt, { decode } from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthorized=catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies;
    //console.log(token);
    if(!token){
        return next(new ErrorHandler("token is not found",400));
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id);
   // console.log(decoded.id);
    next();
})
