import * as mongoose from 'mongoose';
import Message, { MessageModelInterface } from './message.interface';

export const messageSchema = new mongoose.Schema({
    messageText: {
        type: String,
        required: [true, 'The message cannot be empty.'],
        max: 4000000
    },
    userId: {
        type: String,
        required: [true, 'The message requires a User ID.'],
        unique: true
    },
    conversationId: {
        type: String,
        required: [true, 'The message requires a conversation ID.'],
        unique: true
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now
    }
});

const MessageModel: MessageModelInterface = mongoose.model<Message & MessageModelInterface>('Message', messageSchema);

export default MessageModel;