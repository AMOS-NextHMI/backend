# websocket-node-express
A simple implementation of a Websocket server based on node/express written in typescript

# Running the server in docker

0. Change into the server directory
   ```bash
   cd server
   ```

1. Build the container:
   ```bash
    docker-compose build
   ```
2. Run the image:
   ```bash
   docker-compose up
   ```
After every file change these commands have to be rerun. A development dockerfile will follow, to make this easier.
