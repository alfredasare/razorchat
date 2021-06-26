import express from "express";
import {httpBlockUserWithEmail, httpGetAllUsers, httpGetUserByEmail, httpUnblockUserWithEmail} from "./user.controller";

const userRouter = express.Router();

userRouter.get('/user', httpGetUserByEmail);

userRouter.get('/allUsers', httpGetAllUsers);

userRouter.post('/block', httpBlockUserWithEmail);

userRouter.post('/unblock', httpUnblockUserWithEmail);

export default userRouter;