# How to run the webserver and the MongoDB server

Either

## install dependencies 
install mongoDB !!!
```cd server & npm install ```
## how to compile typescript code 
```sudo mongod```
```cd server & npm run start:watch```

Or

## Running the server in docker

0. Install docker and docker-compose then change into the server directory
   ```bash
   cd server
   ```

1. Build the container, and install npm dependencies:
   ```bash
    docker-compose build
    cd src
    npm i
    cd ..
   ```
2. Run the image:
   ```bash
   docker-compose up
   ```
The server can be stopped with the command:
```bash
   docker-compose down
```

# endpoints
websocket  : ws://localhost:8080/ws

REST API see
[APIDokumentation](./APIdocumentation/README.md)

