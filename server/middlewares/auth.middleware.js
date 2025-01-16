import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export async function protectRoute(req, res, next) {

    try {
        const cookie = req.cookies.token;
        if (!cookie) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized',
            });
        }

        const token = jwt.verify(cookie, process.env.JWT_SECRET);
        if(!token){
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized',
            });
        }

        const user = await User.findById(token.id).select('-password');
        if(!user){
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized',
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }


}