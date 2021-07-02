import {Server} from "socket.io";
import {BlockUser, SendMessage, UsersArray} from "./socketTypes";

function initListeners(io: Server) {
    let users: UsersArray[] = [];

    const addUser = (userId: string, socketId: string) => {
        !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
    };

    const removeUser = (socketId: string) => {
        users = users.filter((user) => user.socketId !== socketId);
    };

    const getUser = (userId: string) => {
        return users.find((user) => user.userId === userId);
    };

    io.on('connection', socket => {
        console.log('a user connected');

        socket.on("addUser", userId => {
            addUser(userId, socket.id);
            io.emit("getUsers", users);
        });

        socket.on("sendMessage", ({senderId, receiverId, conversationId, text}: SendMessage) => {
            const user = getUser(receiverId);
            if (user) {
                io.to(user.socketId).emit("getMessage", {
                    senderId,
                    text,
                    conversationId
                });
            }
        });

        socket.on("blockUser", ({senderId, userToBlock, conversationId}: BlockUser) => {
           const receiver = getUser(userToBlock!);
           const sender = getUser(senderId);
           const data = {
               senderId,
               userToBlock,
               isBlocked: true,
               conversationId
           };

           if (receiver) {
               io.to(receiver.socketId).emit("block", data);
           }

           if (sender) {
               io.to(sender.socketId).emit("block", data);
           }
        });

        socket.on("unblockUser", ({senderId, userToUnblock, conversationId}: BlockUser) => {
            const receiver = getUser(userToUnblock!);
            const sender = getUser(senderId);
            const data = {
                senderId,
                userToUnblock,
                isBlocked: false,
                conversationId
            };

            if (receiver) {
                io.to(receiver.socketId).emit("unblock", data);
            }

            if (sender) {
                io.to(sender.socketId).emit("unblock", data);
            }
        });

        socket.on('disconnect', () => {
            console.log('a user disconnected');
            removeUser(socket.id);
            io.emit("getUsers", users);
        });
    });
}

export default initListeners;