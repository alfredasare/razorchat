import Message from "./message.mongo";

async function sendMessage(messageBody: any) {
    const newMessage = new Message(messageBody);
    return newMessage.save();
}

async function getMessages(conversationId: string) {
    return Message.find({
        conversationId
    });
}

export {
    sendMessage,
    getMessages
}