import {Request, Response} from "express";
import {getConversation, getUserConversation, sendConversation} from "../../models/conversation/conversation.model";

async function httpSendConversation(req: Request, res: Response) {
    try {
        const newConversation = await sendConversation(req.body.senderId, req.body.receiverId);
        return res.status(201).json({conversation: newConversation});
    } catch (e) {
        return res.status(400).json({error: e});
    }
}

async function httpGetUserConversation(req: Request, res: Response) {
    try {
        const conversation = await getUserConversation(req.params.userId);
        return res.status(200).json({conversation});
    } catch (e) {
        return res.status(400).json({error: e});
    }
}

async function httpGetConversation(req: Request, res: Response) {
    try {
        const conversation = await getConversation(req.params.firstUserId, req.params.secondUserId);
        return res.status(200).json({conversation});
    } catch (e) {
        return res.status(400).json({error: e});
    }
}

export {
    httpSendConversation,
    httpGetUserConversation,
    httpGetConversation
}