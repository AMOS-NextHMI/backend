import * as express from 'express';
import { MongoHelper } from './mongo.helper';

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
    // res.send('implement get all messages');
});

messagingRouter.get('/message', function (req: express.Request, res: express.Response, next: express.NextFunction) {
    res.send('implement get message by conversation id ');
});

export { messagingRouter };