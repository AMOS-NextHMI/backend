import * as express from 'express';
import { MongoHelper } from './mongo.helper';
import { ObjectId } from 'mongodb'

const messagingRouter = express.Router();

const getCollection = () => {
    return MongoHelper.client.db('messaging').collection('messages');
}

messagingRouter.get('/messages', function (req: express.Request, res: express.Response, next: express.NextFunction) {
    const collection = getCollection();
    collection.find({}).toArray((err, items) => {
        if (err) {
            res.sendStatus(500);
            res.end();
            console.log(`Error in /messages `, err)
        } else {
            res.json(items);
        }

    });
});

messagingRouter.get('/messages/:messageId', function (req: express.Request, res: express.Response, next: express.NextFunction) {
    const id = new ObjectId(req.params.messageId);
    getCollection().findOne({ _id: id }, (error, result) => {
        if (error || result === null) {
            res.sendStatus(404);
        } else {
            res.json(result);
        }
    });
});

export { messagingRouter };