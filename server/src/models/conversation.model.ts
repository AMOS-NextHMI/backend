import * as mongoose from 'mongoose';
import Conversation, { ConversationModelInterface } from './conversation.interface';
import { messageSchema } from './message.model';

const conversationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The conversation needs a name.']
    },

    members: {
        type: [String],
        required: [true, 'The conversation needs to contain members.']

    }, // list of user ids 
    messages: {
        type: [messageSchema],
        required: false
    } // list of messages 
});

const ConversationModel: ConversationModelInterface = mongoose.model<Conversation & ConversationModelInterface>('Conversation', conversationSchema);

export default ConversationModel;