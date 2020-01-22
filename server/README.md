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
The server can be stopped with the command:
```bash
   docker-compose down
```

# Running the projekt for development in docker and file watch

1. Build the container:
   ```bash
    docker-compose -f docker-compose-development.yml build
   ```
2. Rund the image:
   ```bash
    docker-compose -f docker-compose-development.yml up
   ```
The server can be stopped with the command:
```bash
   docker-compose -f docker-compose-development.yml down
```
