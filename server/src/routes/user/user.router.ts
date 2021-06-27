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

userRouter.get('/:id', httpGetUserById);

userRouter.get('/allUsers', httpGetAllUsers);

userRouter.post('/block', httpBlockUserWithEmail);

userRouter.post('/unblock', httpUnblockUserWithEmail);

export default userRouter;