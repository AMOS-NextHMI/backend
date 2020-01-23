


import * as mongoose from 'mongoose';
import { Message } from './message.interface';

const messageSchema = new mongoose.Schema({
    messageText: String,
    userId: String,
    conversationId: String
});

const MessageModel = mongoose.model<Message & mongoose.Document>('Message', messageSchema);

export default MessageModel;