import * as WebSocket from 'ws';
import { Message } from './models/message';
import { server } from './main'
import { MongoHelper } from './mongo.helper';

const getCollection = () => {
    return MongoHelper.client.db('messaging').collection('messages');
}

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server, path: "/ws" });

interface ExtWebSocket extends WebSocket {
    isAlive: boolean;
}

function createMessage(content: string, isBroadcast = false, sender = 'NS'): string {
    return JSON.stringify(new Message(content, isBroadcast, sender));
}

wss.on('connection', (ws: WebSocket) => {


    const extWs = ws as ExtWebSocket;

    extWs.isAlive = true;

    ws.on('pong', () => {
        extWs.isAlive = true;
    });

    //connection is up, let's add a simple simple event
    ws.on('message', (msg: string) => {

        if (msg === null || msg === undefined || msg == '') {
            ws.send('{ "error": "no message send" }');
            return;
        }

        const message = JSON.parse(msg) as Message;

        const collection = getCollection();
        const test = collection.insertOne(message);

        if (message.isBroadcast) {
            //send back the message to the other clients
            wss.clients
                .forEach(client => {
                    if (client != ws) {
                        client.send(createMessage(message.content, true, message.sender));
                    }
                });
        }
        ws.send(createMessage(`You sent -> ${test}`));

    });

    //send immediatly a feedback to the incoming connection    
    ws.send(createMessage('Hi there, I am a WebSocket server'));

    ws.on('error', (err) => {
        console.warn(`Client disconnected - reason: ${err}`);
    })

});

setInterval(() => {
    wss.clients.forEach((ws: WebSocket) => {

        const extWs = ws as ExtWebSocket;

        if (!extWs.isAlive) return ws.terminate();

        extWs.isAlive = false;
        ws.ping(null, undefined);
    });
}, 10000);