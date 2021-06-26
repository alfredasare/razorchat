import {Request, Response} from "express";
import {sendMessage, getMessages} from "../../models/message/message.model";

async function httpSendMessage(req: Request, res: Response) {
    try {
        const savedMessage = await sendMessage(req.body);
        return res.status(201).json({message: savedMessage});
    } catch (e) {
        return res.status(400).json({error: e})
    }
}

async function httpGetMessages(req: Request, res: Response) {
    try {
        const messages = await getMessages(req.params.conversationId);
        return res.status(200).json({messages});
    } catch (e) {
        res.status(400).json({error: e});
    }
}

export {
    httpSendMessage,
    httpGetMessages
};