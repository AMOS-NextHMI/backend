# websocket-node-express
A simple implementation of a Websocket server based on node/express written in typescript

## Setup

Copy the **env_example** to a new file **.env** and change the variable to your needs.

**Attention**

You have to change the JWT keys, leaving them like they are is highly insecure and could result in hacks if left in production.

## Running the webserver and MongoDB in docker

0. Change into the server directory
   ```bash
   cd server
   ```

1. Run the image:
   ```bash
   docker-compose up
   ```
The server can be stopped with the command:
```bash
   docker-compose down
```

**If you want the node_modules on your host for IDE support install npm and run "npm i" in the server directory**
