import {Server} from "socket.io";
import {usersArray} from "./socketTypes";

function initListeners(io: Server) {
    let users: usersArray[] = [];

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

        socket.on("sendMessage", ({senderId, receiverId, conversationId, text}) => {
            const user = getUser(receiverId);
            if (user) {
                io.to(user.socketId).emit("getMessage", {
                    senderId,
                    text,
                    conversationId
                });
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