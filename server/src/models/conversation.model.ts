import * as mongoose from 'mongoose';
import Converstation, { ConversationModelInterface } from './conversation.interface';

const conversationSchema = new mongoose.Schema({
    name: String,
    members: Array, // list of user ids 
    messages: Array, // list of messages 

});

const ConversationModel: ConversationModelInterface = mongoose.model<Converstation & ConversationModelInterface>('Conversation', conversationSchema);

export default ConversationModel;

