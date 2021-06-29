import express from "express";
import {
    httpBlockUserWithEmail,
    httpGetAllUsers,
    httpGetUserByEmail,
    httpGetUserById,
    httpUnblockUserWithEmail
} from "./user.controller";

const userRouter = express.Router();

userRouter.post('/email', httpGetUserByEmail);

userRouter.get('/all', httpGetAllUsers);

userRouter.post('/block', httpBlockUserWithEmail);

userRouter.post('/unblock', httpUnblockUserWithEmail);

userRouter.get('/:id', httpGetUserById);

export default userRouter;