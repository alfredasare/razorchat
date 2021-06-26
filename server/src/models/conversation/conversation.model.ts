import Conversation from "./conversation.mongo";

async function sendConversation(senderId: string, receiverId: string) {
    const newConversation = new Conversation({
        members: [senderId, receiverId]
    });

    return newConversation.save();
}

async function getUserConversation(userId: string) {
    return Conversation.find({
        members: { $in: [userId]}
    });
}

async function getConversation(firstUserId: string, secondUserId: string) {
    return Conversation.findOne({
        members: { $all: [firstUserId, secondUserId]}
    });
}

export {
    sendConversation,
    getUserConversation,
    getConversation
};