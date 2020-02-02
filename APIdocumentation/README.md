## Sending authorized Requests

Authorization happens with JsonWebTokens.
The tokens kan be requested over the /login route and will return the JWT String.
To include the token in your requests add this Header:

Authorization: Bearer YOUR_TOKEN_HERE

## Server -> Phone (GET Requests)

### NewConversation
```
RequestTyp: GET
RequestURL: http://130.149.172.169/conversations
Response: 200 - JSON
Error:
- 400 - Bad Request
- 401 - Unauthorized
- 406 - Not Acceptable
- 500 - ServerError
```

#### JSON Payload Response

```json
  {
"members": [ "STRING" ],
"_id": "5e3734cef2be6e003c6eb9b4",
"name": "STRING",
"messages": [],
"__v": 0
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
RequestURL: http://130.149.172.169/conversations
Response: 201 - Created & conversationID
Error:
- 400 - Bad Request
- 401 - Unauthorized
- 406 - Not Acceptable
- 500 - ServerError
```

#### JSON Payload
```json
{
  "name": "STRING",
  "members": [{"email": "STRING"}, {"email": "STRING"}]
}
```

#### JSON Payload Response

```json
{
  "conversationId": "ID"
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

### passwordReset

#### Request
```
RequestTyp: POST
RequestURL: http://130.149.172.169/passwordReset
Response: 201 - Created 
Error:
- 400 - Bad Request
- 401 - Unauthorized
- 406 - Not Acceptable
- 500 - ServerError
```

#### JSON Payload

```
{
  "email": "STRING"
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
  "email": "STRING",
  "password": "STRING"
}
```

#### JSON Payload Response

The Server will return a JWT with the following payload:

```json
{
  "id": "STRING",
  "email": "STRING"
}
```

### Register

#### Request
```
RequestTyp: POST
RequestURL: http://130.149.172.169/register
Response: 201 - Token -> JSON
Error:
- 401 - { "error": STRING }
- 422 - Unprocessable Entity
```

#### JSON Payload

```json
{
  "name": "STRING",
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
