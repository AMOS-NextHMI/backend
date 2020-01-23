import * as mongodb from "mongodb";
export class MongoHelper {
    public static client: mongodb.MongoClient;


    public static connect(url: string) {
        console.log("trying to connect ");
        return new Promise((resolve, reject) => {
            mongodb.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client: mongodb.MongoClient) => {
                if (err) {
                    reject(err);
                    console.log("couldnt connect to mongodb ", err);
                } else {
                    MongoHelper.client = client;
                    resolve(client);
                    console.log("connected to MongoDB");
                }
            });
        });
    }

    public disconnect(): void {
        MongoHelper.client.close();
    }
}
