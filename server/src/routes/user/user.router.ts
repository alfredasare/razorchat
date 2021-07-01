import express from "express";
import {
    httpGetAllUsers,
    httpGetUserByEmail,
    httpGetUserById,
} from "./user.controller";

const userRouter = express.Router();

userRouter.post('/email', httpGetUserByEmail);

userRouter.get('/all', httpGetAllUsers);

userRouter.get('/:id', httpGetUserById);

export default userRouter;