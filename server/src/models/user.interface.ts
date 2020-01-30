import * as mongoose from 'mongoose';

export default interface User extends mongoose.Document {
    name: string;
    email: string;
    password: string;
	expTimeStamp: number;
	generateToken(): string;
}

export interface UserModelInterface extends mongoose.Model<User> {
    findByCredentials(email: string, password: string): User;
    replacePasswordHash(email: string, password: string): User;
}