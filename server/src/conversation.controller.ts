import * as express from 'express';
import { MongoHelper } from './mongo.helper';
<<<<<<< HEAD
import { ObjectId } from 'mongodb';
import ConversationModel from './models/conversation.model';



=======
import conversationModel from './models/conversation.model';
import messageModel from './models/message.model';
>>>>>>> Modify message model and conversation route to reflect api proposal

const conversationRouter = express.Router();

const getCollection = () => {
    return MongoHelper.client.db('messaging').collection('conversations');
}

conversationRouter.get('/users/:userId/conversations', function (req: express.Request, res: express.Response, next: express.NextFunction) {


    // TODO implement db access
    res.json(
        {
            "conversations": [
                { "conversationId": "dummy-1", "lastmessage": { "senderUserName": "Dummy Alice", "timestamp": "2020-01-15T22:05:24Z", "messageText": "Oh echt, ich hab noch garnichts" } },
                { "conversationId": "dummy-2", "lastmessage": { "senderUserName": "Dummy Carol", "timestamp": "2020-01-17T04:17:17Z", "messageText": "Hey, do you wan't to go out with me?" } },
                { "conversationId": "dummy-3", "lastmessage": { "senderUserName": "Dummy Eve", "timestamp": "2020-01-15T21:26:17Z", "messageText": "Hasta la vista" } }
            ]
        }
    );
});

conversationRouter.get('/conversations/:conversationId', function (req: express.Request, res: express.Response, next: express.NextFunction) {
    // TODO implement db access
    res.json(
        {
            "conversationId": "dummy-1",
            "name": "ChatmitA",
            "member": [
                { "userId": "dummy-a", "name": "Dummy Alice", "pictureURL": "" },
                { "userId": "dummy-b", "name": "Dummy Bob", "pictureURL": "" }
            ],
            "messages": [
                { "senderUserID": "dummy-a", "timestamp": "2020-01-15T21:26:17Z", "messageText": "Hallo Alice, ?" },
                { "senderUserID": "dummy-b", "timestamp": "2020-01-15T21:40:24Z", "messageText": "Hey, hey" },
                { "senderUserID": "dummy-a", "timestamp": "2020-01-15T21:55:24Z", "messageText": "Hast du schon was fuer das AMOS gemacht" },
                { "senderUserID": "dummy-b", "timestamp": "2020-01-15T21:57:24Z", "messageText": "Ja ganz viel" },
                { "senderUserID": "dummy-a", "timestamp": "2020-01-15T22:05:24Z", "messageText": "Oh echt, ich hab noch garnichts" }
            ]
        }
    );
});


// ### POST NewConversation --> conversation_id on 201
conversationRouter.post('/conversation', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const members = req.body['members'];
<<<<<<< HEAD
    const collection = getCollection();
    const conversation = new ConversationModel(
=======
    const conversation = new conversationModel



    // TODO implement db access
    res.status(201).json(
>>>>>>> Modify message model and conversation route to reflect api proposal
        {
            name: req.body.name,
            member: req.body.members,
            messages: []
        })
    collection.insertOne(conversation, (err, conv) => {
        if (err) {
            res.status(500).json({
                "error": err
            });
            return;
        }
        res.status(201).json(
            {
                "conversationId": conversation.id
            }
        );
        res.send()
    });
});


conversationRouter.post('/conversations/:conversationId/messages', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { messageText, authUserId, conversationId } = req.params;
    const collection = getCollection();
    const message = new messageModel({
        messageText: messageText,
        authUserId: authUserId,
        conversationId: conversationId
    });
    collection.insertOne(message, (err, message) => {
        if (err) {
            res.status(500).json({
                "error": err
            });
            return;
        }

        res.status(201).end();
    });
});

export { conversationRouter };