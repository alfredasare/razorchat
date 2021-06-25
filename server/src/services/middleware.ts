import {Request, Response, NextFunction} from "express";
import {Error} from "mongoose";

import * as logger from '../utils/logger';

const unknownEndpoint = (_req: Request, res: Response) => {
    res.status(404).send({
        error: "unknown endpoint"
    });
};

const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
    if (error.name === 'CastError') {
        return res.status(400).json({error: 'Invalid id'});
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({error: error.message});
    }

    logger.error(error.message);

    next(error);
};

export {
    unknownEndpoint,
    errorHandler
};