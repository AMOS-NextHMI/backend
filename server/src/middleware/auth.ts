import * as jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { JWT_KEY } from '../env';
import { Request, Response, NextFunction } from 'express';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const auth_header: string = req.header('Authorization') || '';
    const token: string = auth_header.replace('Bearer ', '');
    try {
        const payload: any = jwt.verify(token, JWT_KEY);
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