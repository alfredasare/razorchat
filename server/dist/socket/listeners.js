"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initListeners(io) {
    var users = [];
    var addUser = function (userId, socketId) {
        !users.some(function (user) { return user.userId === userId; }) &&
            users.push({ userId: userId, socketId: socketId });
    };
    var removeUser = function (socketId) {
        users = users.filter(function (user) { return user.socketId !== socketId; });
    };
    var getUser = function (userId) {
        return users.find(function (user) { return user.userId === userId; });
    };
    io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on("addUser", function (userId) {
            addUser(userId, socket.id);
            io.emit("getUsers", users);
        });
        socket.on("sendMessage", function (_a) {
            var senderId = _a.senderId, receiverId = _a.receiverId, conversationId = _a.conversationId, text = _a.text;
            var user = getUser(receiverId);
            if (user) {
                io.to(user.socketId).emit("getMessage", {
                    senderId: senderId,
                    text: text,
                    conversationId: conversationId
                });
            }
        });
        socket.on("blockUser", function (_a) {
            var senderId = _a.senderId, userToBlock = _a.userToBlock, conversationId = _a.conversationId;
            var receiver = getUser(userToBlock);
            var sender = getUser(senderId);
            var data = {
                senderId: senderId,
                userToBlock: userToBlock,
                isBlocked: true,
                conversationId: conversationId
            };
            if (receiver) {
                io.to(receiver.socketId).emit("block", data);
            }
            if (sender) {
                io.to(sender.socketId).emit("block", data);
            }
        });
        socket.on("unblockUser", function (_a) {
            var senderId = _a.senderId, userToUnblock = _a.userToUnblock, conversationId = _a.conversationId;
            var receiver = getUser(userToUnblock);
            var sender = getUser(senderId);
            var data = {
                senderId: senderId,
                userToUnblock: userToUnblock,
                isBlocked: false,
                conversationId: conversationId
            };
            if (receiver) {
                io.to(receiver.socketId).emit("unblock", data);
            }
            if (sender) {
                io.to(sender.socketId).emit("unblock", data);
            }
        });
        socket.on('disconnect', function () {
            console.log('a user disconnected');
            removeUser(socket.id);
            io.emit("getUsers", users);
        });
    });
}
exports.default = initListeners;
