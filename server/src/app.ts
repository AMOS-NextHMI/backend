import * as express from 'express';
import * as WebSocket from 'ws';
import {Message} from './models/message';
import * as cors from 'cors';
import { requestLoggerMiddleware } from './request.logger.middleware';
import  * as bodyParser from 'body-parser'


const app = express();


// add middleware here 
app.use(cors());
app.use(requestLoggerMiddleware);
app.use(bodyParser.json())


app.get('/messages', function (req : express.Request, res: express.Response, next: express.NextFunction) {
    res.send('implement get all messages');
});

app.get('/message', function (req: express.Request , res: express.Response, next : express.NextFunction) {
    res.send('implement get message by conversation id ');
});


export {app}
