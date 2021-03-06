import { config } from 'dotenv';
import { resolve } from 'path';
let dotenv_result = config({ path: resolve(".env") });

if (dotenv_result.error) {
    dotenv_result = config({ path: resolve(".env_example") });

    if (dotenv_result.error) {
        throw "Please create an .env file in the server directory or download the .env_example file ";
    }
}

import { app } from './app';
import * as http from 'http';
import { MongoHelper } from "./mongo.helper";
import * as mongoose from 'mongoose';

const PORT = 80;
const MONGO_DB_URL: string = process.env.MONGO_DB_URL ?? 'mongodb://mongo:27017/server';

//initialize a simple http server
let server = http.createServer(app);

mongoose.connect(MONGO_DB_URL, {
    useNewUrlParser: true
});

server.listen(process.env.PORT || PORT, async () => {

    console.log(`Example app listening on port ${PORT}.`);
    try {
        await MongoHelper.connect(MONGO_DB_URL);
    } catch (error) {
        console.error(error);
    }
});



export { server }
