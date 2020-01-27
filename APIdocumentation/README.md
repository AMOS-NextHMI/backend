## Server -> Phone (GET Requests)

### ConversationsOverview

#### Request
```
RequestTyp: GET
RequestURL: http://130.149.172.169/users/userId=STRING/conversations
Response: 200 - OK -> JSON
Error:
- 400 - Bad Request
- 401 - Unauthorized
- 404 - Not Found
- 500 - ServerError
```

#### JSON Payload
```json
{ "conversations": [
    {"conversationId": "STRING", "lastmessage": {"senderUserID": "STRING", "timestamp": "STRING", "messageText": "STRING"}},
    {"conversationId": "STRING", "lastmessage": {"senderUserID": "STRING", "timestamp": "STRING", "messageText": "STRING"}},
    {"conversationId": "STRING", "lastmessage": {"senderUserID": "STRING", "timestamp": "STRING", "messageText": "STRING"}}
  ]
}
```

### Conversation

#### Request

```
RequestTyp: GET
RequestURL: http://130.149.172.169/conversations/conversationId=STRING
Response: 200 - OK -> JSON
Error:
- 400 - Bad Request
- 401 - Unauthorized
- 404 - Not Found
- 500 - ServerError
```

#### JSON Payload
```json
{ "conversationId": "STRING",
  "name": "STRING",
  "member": [
      {"userId": "STRING", "name": "STRING", "pictureURL": "String"},
      {"userId": "STRING", "name": "STRING", "pictureURL": "String"}
  ],
  "messages": [
      {"senderUserID": "STRING", "timestamp": "STRING", "messageText": "STRING"},
      {"senderUserID": "STRING", "timestamp": "STRING", "messageText": "STRING"},
  ]
}
```

## Phone -> Server (Post)

### NewConversation

#### Request
```
RequestTyp: POST
RequestURL: http://130.149.172.169/conversation
Response: 201 - Created & conversationID
Error:
- 400 - Bad Request
- 401 - Unauthorized
- 406 - Not Acceptable
- 500 - ServerError
```

#### JSON Payload
```json
{ "members": [
    {"member": "userId"}
  ]
}
```

### NewMessage

#### Request
```
RequestTyp: POST
RequestURL: http://130.149.172.169/conversations/conversationId=STRING/messages
Response: 201 - Created 
Error:
- 400 - Bad Request
- 401 - Unauthorized
- 406 - Not Acceptable
- 500 - ServerError
```

#### JSON Payload

```json
{
  "messageText": "STRING"
}
```

### Login

#### Request
```
RequestTyp: POST
RequestURL: http://130.149.172.169/login
Response: 200 - Token -> JSON
Error:
- 401 - { "error": "STRING" }
- 422 - Unprocessable Entity
```

#### JSON Payload Post

```json
{
  "username": "STRING",
  "password": "STRING"
}
```

#### JSON Payload Response

The Server will return a JWT with the following payload:

```json
{
  "id": "STRING",
  "exp": "Date",
  "username": "STRING"
}
```

### Register

#### Request
```
RequestTyp: POST
RequestURL: http://130.149.172.169/register
Response: 201 - Created
Error:
- 401 - { "error": STRING }
- 422 - Unprocessable Entity
```

#### JSON Payload

```json
{
  "username": "STRING",
  "email": "STRING",
  "password": "STRING"
}
```

## Server -> Phone (GET)

Conversation(id, name, participant (id, name, pictureurl), message (Sender, Text, Timestamp))
ConversationOverview(conversationIDs, lastMessages)
/getConversation ConId
/getconversationOverview UserId


## Phone -> Server (POST)

newMessage(ConversationID, Text)
newConversation(participantsID)
login(username, email, password)
/postNewMessage
/postNewConversation
