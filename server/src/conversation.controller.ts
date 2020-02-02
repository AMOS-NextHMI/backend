import * as express from 'express';
import { MongoHelper } from './mongo.helper';
import { ObjectId } from 'mongodb';
import ConversationModel from './models/conversation.model';
import Message from './models/message.model';
import { auth } from './middleware/auth';
import Conversation from './models/conversation.interface';

const conversationRouter = express.Router();

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
    const userId = req.user?.id;
    ConversationModel.findOne({
        _id: new ObjectId(req.params.conversationId),
        members: userId
    }).then((conv) => {
        res.status(200).json(conv);
    }).catch((error) => {
        res.status(422).json({ "error": error });
    });
});


// ### POST NewConversation --> conversation_id on 201
conversationRouter.post('/conversations', auth, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const conversation = new ConversationModel(req.body);
    conversation.save(error => {
        if (error) {
            res.status(422).json({ "error": error });
            return;
        }
        res.status(201).json({ "conversationId": conversation.id });
        res.send()
    });
});


conversationRouter.post('/conversations/:conversationId/messages', auth, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const conversationId = req.params.conversationId;
    const messageText = req.body.messageText;
    const message = new Message({
        messageText: messageText,
        userId: req.user?.id,
        conversationId: conversationId
    });
    ConversationModel.findById(conversationId, (error, conversation: Conversation) => {
        if (error || !conversation) {
            res.status(422).end();
        }
        conversation.messages.push(message);
        conversation.save();
        res.status(201).end();
    });
});

export { conversationRouter };