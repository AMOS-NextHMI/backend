import * as express from 'express';
const requestLoggerMiddleware = (req: express.Request, resp: express.Response, next: express.NextFunction) =>  {
    console.log(`${req.method} ${req.originalUrl}`);
    let start = new Date().getTime();
    resp.on('finish', () => {
        const elapsedTime = new Date().getTime() - start ;
        console.info(`${req.method} ${req.originalUrl} ${resp.statusCode} ${elapsedTime}`);

    })
    next();
}

export {requestLoggerMiddleware};