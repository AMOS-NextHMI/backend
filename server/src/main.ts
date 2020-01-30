import { app } from './app';
import * as http from 'http';
import { MongoHelper } from "./mongo.helper";
import * as mongoose from 'mongoose';


const PORT = 80;
const MONGO_DB_URL: string = 'mongodb://localhost:27017/server';

//initialize a simple http server
let server = http.createServer(app);

mongoose.connect(MONGO_DB_URL, {
    useNewUrlParser: true
});

server.listen(process.env.PORT || PORT, async () => {

    console.log(`Example app listening on port ${PORT}.`);
    try {
    	console.log("borf");
        await MongoHelper.connect(MONGO_DB_URL);
        console.log("diddly");
    } catch (error) {
    	console.log("fuck!");
        console.error(error);
    }
});



export { server }