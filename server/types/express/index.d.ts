import User from "../../src/models/user.interface";

declare module 'express-serve-static-core' {
    interface Request {
        user?: User;
        token?: string;
    }
    interface Response {
        user?: User;
        token?: string;
    }
}