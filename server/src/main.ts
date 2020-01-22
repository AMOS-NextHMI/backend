import {app} from './app';
import * as http from 'http';
import { MongoHelper } from "./mongo.helper";


const PORT = 80;
const MONGO_DB_URL: string = 'mongodb://mongo:27017/server';

//initialize a simple http server
var server = http.createServer(app);

server.listen(process.env.PORT || PORT, async () => {
    console.log(`Example app listening on port ${PORT}.`);
    try {
        await MongoHelper.connect(MONGO_DB_URL);
    } catch (error) {
        console.error(error);
    }
});



export { server }