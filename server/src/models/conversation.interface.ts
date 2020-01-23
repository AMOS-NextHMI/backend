export class Converstation {
    constructor(
        public converstationId: string,
        public name : string,
        public members : Array<string>, // list of user ids 
        public messages : Array<string>, // list of messages 
    ){}

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
