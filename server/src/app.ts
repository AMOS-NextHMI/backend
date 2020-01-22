import * as express from 'express';
import * as WebSocket from 'ws';
import { Message } from './models/message';
import * as cors from 'cors';
import { requestLoggerMiddleware } from './request.logger.middleware';
import * as bodyParser from 'body-parser'
import { messagingRouter } from './messaging.controller';


let app :any 
app = express();


// add middleware here 
app.use(cors());
app.use(requestLoggerMiddleware);
app.use(bodyParser.json());
app.use(messagingRouter);


export { app }
