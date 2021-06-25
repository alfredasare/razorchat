import mongoose from 'mongoose';
import {MONGODB_URI} from "../utils/config";
import * as logger from '../utils/logger';

mongoose.connection.once('open', () => {
    logger.info('MongoDB connection ready');
});

mongoose.connection.on('error', err => {
    logger.info(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

export {mongoConnect, mongoDisconnect};