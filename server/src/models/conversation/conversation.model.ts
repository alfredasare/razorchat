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

async function blockUser(senderId: string, userToBlock: string) {
    const conversation: any = await getConversation(senderId, userToBlock);
    const isBlocked = !!conversation.blockedBy;

    if (isBlocked) {
        conversation.blockedBy = "";
    } else {
        conversation.blockedBy = senderId;
    }

    await conversation.save();
}

export {
    sendConversation,
    getUserConversation,
    getConversation,
    blockUser
};