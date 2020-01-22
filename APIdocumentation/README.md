## Server->Phone (GET Requests)

### ConversationsOverview

#### JSON Payload

```json
{ "conversations": [
    {"conversationId": "STRING", "lastmessage": "STRING"},
    {"conversationId": "STRING", "lastmessage": "STRING"},
    {"conversationId": "STRING", "lastmessage": "STRING"}
  ]
}
```

### Conversation

#### JSON Payload
```json
{ "conversationId": "STRING",
  "name": "STRING",
  "member": [
      {"userId": "STRING", "name": "STRING", "pictureURL": "String"},
      {"userId": "STRING", "name": "STRING", "pictureURL": "String"}
  ],
  "messages": [
      {"senderUserID": "STRING", "timestamp": "STRING", "messageText": "STRING"}
      {"senderUserID": "STRING", "timestamp": "STRING", "messageText": "STRING"},
  ]
}
```

## Phone -> Server (Post)

### NewConversation

#### JSON Payload
```json
{ "members": [
    {"member": "userId"}
  ]
}
```

### NewMessage

#### JSON Payload

```json
{ "conversationId": "STRING",
  "messageText": "STRING"
}
```


Server->Phone (GET)

Conversation (id, name, participant (id, name, pictureurl), message (Sender, Text, Timestamp))
ConversationOverview(conversationIDs, lastMessages)
/getConversation ConId
/getconversationOverview UserId


Phone-> Server
newMessage(ConversationID, Text)
newConversation(participantsID,)
/postNewMessage
/postNewConversation
