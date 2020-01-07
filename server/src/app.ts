import * as express from 'express';
import * as WebSocket from 'ws';
import {Message} from './models/message';
import * as cors from 'cors';


const app = express();

app.use(cors());

export {app}
