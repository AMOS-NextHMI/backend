import * as express from 'express';
import { MongoHelper } from './mongo.helper';
import { ObjectId } from 'mongodb';
import ConversationModel from './models/conversation.model';
import Message from './models/message.model';
import { auth } from './middleware/auth';
import Conversation from './models/conversation.interface';
import * as mongoose from 'mongoose';

const conversationRouter = express.Router();

conversationRouter.get('/conversations', auth, function (req: express.Request, res: express.Response, next: express.NextFunction) {
    ConversationModel.find({ members: req.user?.email }, (error, conversations) => {
        if (error) {
            console.log(error);
        }
        console.log(conversations);
        res.json(conversations);
    });
    // TODO implement db access

});


// ### GET conversation by id --> conversation object on success
conversationRouter.get('/conversations/:conversationId', auth, function (req: express.Request, res: express.Response, next: express.NextFunction) {
    const userEmail = req.user?.email;

    if (isNotValidId(req.params.conversationId)) {
        res.status(422).json({
            "error": "Not a valid Id"
        }).end();
        return;
    }

    ConversationModel.findOne({
        _id: new ObjectId(req.params.conversationId),
        members: userEmail
    }).then((conv) => {
        res.status(200).json(conv);
    }).catch((error) => {
        res.status(422).json({ "error": error });
    });
});


// ### POST NewConversation --> conversation_id on 201
conversationRouter.post('/conversations', auth, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const conversation = new ConversationModel(req.body);


    conversation.members.push((req.user?.email || ""));

    conversation.save((error, convo) => {
        if (error) {
            res.status(422).json({ "error": error });
            return;
        }

        res.status(201).json({ "conversationId": convo.id });
        res.send()
    });
});


conversationRouter.post('/conversations/:conversationId/messages', auth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const conversationId = req.params.conversationId;
    const messageText = req.body.messageText;

    if (isNotValidId(conversationId)) {
        res.status(422).json({
            "error": "Not a valid Id"
        }).end();
        return;
    }

    const conversationExists = await ConversationModel.exists({ _id: new ObjectId(conversationId) });

    if (!conversationExists) {
        return res.status(404).end();
    }

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

function isNotValidId(mongooseId: any) {
    return !mongoose.Types.ObjectId.isValid(mongooseId);
}

export { conversationRouter };