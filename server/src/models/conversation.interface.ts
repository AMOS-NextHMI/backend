import * as mongoose from 'mongoose';
import Message from './message.interface';
import User from './user.interface';

export default interface Conversation extends mongoose.Document {
    name: string;
    members: Array<String>; // list of user ids 
    messages: Array<Message>; // list of messages 
}

export interface ConversationModelInterface extends mongoose.Model<Conversation> {

}

// { "conversationId": "dummy-1",
// "name": "ChatmitA",
// "member": [
//     {"userId": "dummy-a", "name": "Dummy Alice", "pictureURL": ""},
//     {"userId": "dummy-b", "name": "Dummy Bob", "pictureURL": ""}
// ],
// "messages": [
//     {"senderUserID": "dummy-a", "timestamp": "2020-01-15T21:26:17Z", "messageText": "Hallo Alice, ?"},
//     {"senderUserID": "dummy-b", "timestamp": "2020-01-15T21:40:24Z", "messageText": "Hey, hey"},
//     {"senderUserID": "dummy-a", "timestamp": "2020-01-15T21:55:24Z", "messageText": "Hast du schon was fuer das AMOS gemacht"},
//     {"senderUserID": "dummy-b", "timestamp": "2020-01-15T21:57:24Z", "messageText": "Ja ganz viel"},
//     {"senderUserID": "dummy-a", "timestamp": "2020-01-15T22:05:24Z", "messageText": "Oh echt, ich hab noch garnichts"}
//   ]
// }
