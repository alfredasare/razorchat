import http from "http";
import * as logger from './utils/logger';

import {mongoConnect} from './services/mongo';
import app from "./app";
import {PORT} from "./utils/config";

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    server.listen(PORT, () => {
        logger.info(`Listening on port ${PORT}`);
    });
}

startServer();