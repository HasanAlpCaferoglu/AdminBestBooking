import jwt from "jsonwebtoken";
import { createError} from "./error.js";

// verification of our authentication
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    // if there is no token, it means we are not authenticated
    if(!token) {
        return next(createError(401, "You are not authenticated!")) // 401--> unauthorized
    }

    // If there is a token, it doesn’t mean it is a correct one 
    // verify whether the token is correct token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) return next(createError(403, "Token is not valid!")); // 403 --> forbidden
        req.user = user; // if every thing is good, send new request property
        next();
    }); 
    // remember user includes id and idAdmin info since we define our token such that it includes these infos
};

export const verifyUser = (req, res, next) => {
    // call the verifyToken function because to verify user it should be authenticated first
    // only the owner of the account and admin can delete or edit its account
    verifyToken(req, res, next, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin) { // now we can use the user property of req created above in line 16
            next()
        } else {
            return next(createError(403, "You are not authorized!"))
        }
    })
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, ()=> {
        console.log(req.user.idAdmin)
        if(req.user.isAdmin) { 
            next()
        } else {
            return next(createError(403, "You are not authorized!"))
        }
    })
};
