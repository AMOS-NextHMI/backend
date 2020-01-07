import { app } from "./app";
import * as http from 'http';


const PORT = 8080;

//initialize a simple http server
const server = http.createServer(app);

server.listen(process.env.PORT || PORT, function () {
    console.log('Example app listening on port}.');
});



export {server}