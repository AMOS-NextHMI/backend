import * as jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';

const JWT_KEY_PUB = process.env.JWT_KEY_PUB ?? '123';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const auth_header: string = req.header('Authorization') || '';
    const token: string = auth_header.replace('Bearer ', '');
    try {
        const payload: any = jwt.verify(token, JWT_KEY_PUB);
        const user = await User.findOne({ _id: payload.id, 'tokens.token': token });
        if (!user) {
            throw new Error()
        }
        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(401).json({ error: 'Unauthorized' });
    }
}