import * as mongoose from 'mongoose';
import { Converstation } from './conversation.interface';

const conversationSchema = new mongoose.Schema({
    name : String,
    members : Array, // list of user ids 
    messages : Array, // list of messages 
    
});

const ConversationModel = mongoose.model<Converstation & mongoose.Document>('Conversation', conversationSchema);

export default ConversationModel;

