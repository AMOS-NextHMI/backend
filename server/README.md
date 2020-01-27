# websocket-node-express
A simple implementation of a Websocket server based on node/express written in typescript

# Running the server in docker

0. Change into the server directory
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

**If new npm dependencies are installed you have to rerun "npm i"**
