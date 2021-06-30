import {Text} from "@chakra-ui/react";
import ChatTile from "./chatTile";


const ConversationsList = (
    {
        isLoadingConversations,
        conversations,
        active,
        handleActive,
        currentUser,
        onlineUsers
    }
) => {

    if (isLoadingConversations) {
        return (
            <Text mt={5}>
                Loading conversations...
            </Text>
        );
    }

    return (
        conversations?.map((item) => (
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