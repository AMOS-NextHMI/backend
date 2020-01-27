import * as express from 'express';
import { MongoHelper } from './mongo.helper';
import { ObjectId } from 'mongodb';
import ConversationModel from './models/conversation.model';
import MessageModel from './models/message.model';
import { auth } from './middleware/auth';

const conversationRouter = express.Router();

const getCollection = () => {
    return MongoHelper.client.db('messaging').collection('conversations');
}

conversationRouter.get('/users/:userId/conversations', auth, function (req: express.Request, res: express.Response, next: express.NextFunction) {


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


// ### GET conversation by id --> conversation object on success
conversationRouter.get('/conversations/:conversationId', auth, function (req: express.Request, res: express.Response, next: express.NextFunction) {
    const collection = getCollection();
    collection.findOne({
        _id: new ObjectId(req.params.conversationId),
    }).then((conv) => {
        console.log(conv);
        res.status(200).json(conv);

    }).catch((error) => {
        res.status(500).json({ "error": error });

    });
});


// ### POST NewConversation --> conversation_id on 201
conversationRouter.post('/conversation', auth, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const collection = getCollection();
    const conversation = new ConversationModel(
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


conversationRouter.post('/conversations/:conversationId/messages', auth, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { messageText, authUserId, conversationId } = req.params;
    const collection = getCollection();
    const message = new MessageModel({
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