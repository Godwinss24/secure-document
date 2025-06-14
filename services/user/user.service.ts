import { User } from "../../models";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';
const EXPIRES_IN = '1h';

export async function createUser(email: string, password: string) {

    return await User.create({
        email,
        password
    });

}

export async function findOneUser(email: string) {

    return await User.findOne({
        where: {
            email
        }
    });

}


export async function generateJWt(email: string) {
    
    return jwt.sign(
        { email },
        JWT_SECRET,
        { expiresIn: EXPIRES_IN }
    );
}