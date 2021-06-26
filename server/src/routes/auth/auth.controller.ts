import {Request, Response} from "express";

function httpAuthorizedFunction (_req: Request, res: Response) {
    res.send('Secured Resource');
};

export {
    httpAuthorizedFunction
};