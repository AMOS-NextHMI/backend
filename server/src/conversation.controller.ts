import * as express from 'express';
import { MongoHelper } from './mongo.helper';
import { ObjectId } from 'mongodb';

const conversationRouter = express.Router();

const getCollection = () => {
    return MongoHelper.client.db('messaging').collection('conversations');
}

conversationRouter.get('/users/:userId/conversations', function (req: express.Request, res: express.Response, next: express.NextFunction) {
    // TODO implement db access
    res.json(
        {
            "conversations": [
                { "conversationId": "STRING", "lastmessage": { "senderUserID": "STRING", "timestamp": "STRING", "messageText": "STRING" } },
                { "conversationId": "STRING", "lastmessage": { "senderUserID": "STRING", "timestamp": "STRING", "messageText": "STRING" } },
                { "conversationId": "STRING", "lastmessage": { "senderUserID": "STRING", "timestamp": "STRING", "messageText": "STRING" } }
            ]
        }
    );
});

conversationRouter.get('/conversations/:conversationId', function (req: express.Request, res: express.Response, next: express.NextFunction) {
    // TODO implement db access
    res.json(
        {
            "conversationId": "STRING",
            "name": "STRING",
            "member": [
                { "userId": "STRING", "name": "STRING", "pictureURL": "String" },
                { "userId": "STRING", "name": "STRING", "pictureURL": "String" }
            ],
            "messages": [
                { "senderUserID": "STRING", "timestamp": "STRING", "messageText": "STRING" },
                { "senderUserID": "STRING", "timestamp": "STRING", "messageText": "STRING" },
            ]
        }
    );
});

conversationRouter.post('/conversations/:conversationId', function (req: express.Request, res: express.Response, next: express.NextFunction) {
    // TODO implement db access
    res.status(201).json(
        {
            "conversationId": "507f1f77bcf86cd799439011"
        }
    );
});


conversationRouter.post('/conversations/:conversationId/messages', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // TODO implement db access
    res.status(201).json(
        {}
    );
});

export { conversationRouter };