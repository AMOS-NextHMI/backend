import * as express from 'express';
import * as cors from 'cors';
import { requestLoggerMiddleware } from './request.logger.middleware';
import * as bodyParser from 'body-parser'
import { messagingRouter } from './messaging.controller';
import { conversationRouter } from './conversation.controller';
import { authorisationRouter } from './authorisation.controller';


let app: any
app = express();

// add middleware here 
app.use(cors());
app.use(requestLoggerMiddleware);
app.use(bodyParser.json());
app.use(messagingRouter);
app.use(conversationRouter);
app.use(authorisationRouter);

export { app }
