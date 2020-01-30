import * as mongoose from 'mongoose';

export default interface Message extends mongoose.Document {
	messageText: string,
    userId: string,
    conversationId: string,
	createdAt: Date
}

export interface MessageModelInterface extends mongoose.Model<User> {

}