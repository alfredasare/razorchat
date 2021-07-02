import http from "http";
import {Server} from "socket.io";
import initListeners from "./socket/listeners";
import * as logger from './utils/logger';

import {mongoConnect} from './services/mongo';
import app from "./app";
import {PORT} from "./utils/config";

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

initListeners(io);

async function startServer() {
    await mongoConnect();
    server.listen(PORT, () => {
        logger.info(`Listening on port ${PORT}`);
    });
}

startServer();