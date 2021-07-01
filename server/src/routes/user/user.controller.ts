import {Request, Response} from "express";
import {
    getAllUsers,
    getUserByEmail,
    getUserById
} from "../../models/user/user.model";

async function httpGetUserByEmail(req: Request, res: Response) {
    try {
        const user = await getUserByEmail(req.body.email);
        return res.status(200).json({user});
    } catch (e) {
        return res.status(400).json({error: e});
    }
}

async function httpGetUserById(req: Request, res: Response) {
    try {
        const user = await getUserById(req.params.id);
        return res.status(200).json({user});
    } catch (e) {
        return res.status(400).json({error: e});
    }
}

async function httpGetAllUsers(_req: Request, res: Response) {
    try {
        const users = await getAllUsers();
        return res.status(200).json({users});
    } catch (e) {
        return res.status(400).json({error: e});
    }
}

export {
    httpGetUserByEmail,
    httpGetUserById,
    httpGetAllUsers
}