import express from "express";
import jwtCheck from "../../models/auth/auth.model";
import guard from "express-jwt-permissions";
import {httpAuthorizedFunction} from "./auth.controller";

const authRouter = express.Router();

authRouter.use(jwtCheck);

authRouter.get('/hello', (_req, res) => {
    res.send('Ok');
});

authRouter.get('/authorized', guard().check(["read:chat"]), httpAuthorizedFunction);

export default authRouter;