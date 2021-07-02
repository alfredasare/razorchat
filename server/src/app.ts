import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from "helmet";
import 'express-async-errors';

import api from "./routes/api/v1";
import {unknownEndpoint, errorHandler} from './services/middleware';

const app = express();

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://razorchat.vercel.app'
    ],
    credentials: true
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());

app.use('/v1', api);
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;