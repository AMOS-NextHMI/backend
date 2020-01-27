import * as WebSocket from 'ws';
import { server } from './main'

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server, path: "/ws" });

interface ExtWebSocket extends WebSocket {
    isAlive: boolean;
}

wss.on('connection', (ws: WebSocket) => {


    const extWs = ws as ExtWebSocket;

    extWs.isAlive = true;

    ws.on('pong', () => {
        extWs.isAlive = true;
    });

    //connection is up, let's add a simple simple event
    ws.on('message', (msg: string) => {

    });

    //send immediatly a feedback to the incoming connection    
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