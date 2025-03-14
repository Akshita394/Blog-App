import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.access_token; // ✅ Get token from cookies
        //console.log("Token received:", token); // Debugging log

        if (!token) {
            return next(errorHandler(401, 'You are not authorized to access this route'));
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
            if (err) {
                console.error("JWT Verification Error:", err.message);
                return next(errorHandler(403, 'Invalid or expired token'));
            }
            req.user = decodedUser; // ✅ Attach user data to request
            next();
        });

    } catch (error) {
        return next(errorHandler(500, 'Internal Server Error'));
    }
};

/*import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token);
        if (!token) {
            return next(errorHandler( 401,'You are not authorized to access this route'));
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodeToken
        next()
};



/*
import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) {
        return next(errorHandler( 401,'You are not authorized to access this route'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(401, 'You are not authorized to access this route'));
        }
        req.user = user;
        next();
    }); 
};
*/ 