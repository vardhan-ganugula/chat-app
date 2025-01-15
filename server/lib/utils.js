import jsonwebtoken from 'jsonwebtoken';
import {config} from 'dotenv';
config();



export const generateToken = (user) => {

    return jsonwebtoken.sign({id:user._id, email:user.email}, process.env.JWT_SECRET, {expiresIn: '30d'});
}