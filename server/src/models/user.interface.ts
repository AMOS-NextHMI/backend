import * as mongoose from 'mongoose';

interface User extends mongoose.Document {
    generateToken(): string;
    name: string;
    email: string;
    password: string;
    expTimeStamp: number;
}

export interface UserModelInterface extends mongoose.Model<User> {
    findByCredentials(email: string, password: string): User;
    replacePasswordHash(email: string, password: string): User;
}

export default User;