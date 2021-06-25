import {Request, Response} from "express";

const httpAuthorizedFunction = (_req: Request, res: Response) => {
    res.send('Secured Resource');
};

export {
    httpAuthorizedFunction
};