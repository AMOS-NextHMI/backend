import * as mongoose from 'mongoose';
import User from './user.interface';

export default interface Message extends mongoose.Document {
    messageText: string,
    userId: string,
    conversationId: string,
    createdAt: Date
}

export interface MessageModelInterface extends mongoose.Model<Message> {

}