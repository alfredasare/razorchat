export const updateConversations = (conversations, updatedConversation) => {
    const otherConversations = conversations.filter(conversation => conversation._id !== updatedConversation._id);

    return [
        updatedConversation,
        ...otherConversations
    ];
};