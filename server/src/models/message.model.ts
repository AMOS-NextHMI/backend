import * as mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    messageText: {
        type: String,
        required: [true, 'The message cannot be empty.'],
        max: 4000000
    },
    userId: {
        type: String,
        required: [true, 'The message requires a User ID.'],
        unique: true,
    },
    conversationId: {
        type: String,
        required: [true, 'The message requires a conversation ID.'],
        unique: true
    },
    createdAt: {
        type: Date,
        required: [true, 'The message requires a creation date.'],
        default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;