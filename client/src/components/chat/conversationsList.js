import {useEffect, useState} from "react";
import {Text} from "@chakra-ui/react";
import ChatTile from "./chatTile";


const ConversationsList = (
    {
        isLoadingConversations,
        conversations,
        active,
        handleActive,
        currentUser,
        onlineUsers,
        updatedConversation
    }
) => {
    const [newConversations, setNewConversations] = useState([]);

    useEffect(() => {
        if (updatedConversation?.isBlocked === true && updatedConversation?.userToBlock === currentUser?.id) {
            const filteredConversations = conversations?.filter(conversation => (
                conversation._id !== updatedConversation.conversationId
            ));
            setNewConversations(filteredConversations);
        } else if (updatedConversation?.isBlocked === false && updatedConversation?.userToUnblock === currentUser?.id) {
            const blockedConversation = conversations?.find(conversation => (
                conversation._id === updatedConversation.conversationId
            ));
            console.log(blockedConversation);
            setNewConversations([
                blockedConversation,
                ...newConversations
            ]);
        } else {
            setNewConversations(conversations);
        }
    }, [updatedConversation, conversations]);

    if (isLoadingConversations) {
        return (
            <Text mt={5}>
                Loading conversations...
            </Text>
        );
    }

    return (
        newConversations?.map((item) => (
            <ChatTile
                key={item._id}
                conversation={item}
                active={active}
                currentUser={currentUser}
                handleActive={handleActive}
                onlineUsers={onlineUsers}
            />
        ))
    );
};

export default ConversationsList;