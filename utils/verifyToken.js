import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401, "You are not authenticated :/"))
    }

    jwt.verify(token, process.env.JWT,(err, user) => {
        if(err) return next(createError(403, "Token is not valid :("));
        req.user = user;
        next()

    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };//if it equals this user id or adminthat is inside the jwt token it means we are the owner if its not we are gonna send another error 


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) { //only condition
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};