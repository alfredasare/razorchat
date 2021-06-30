import {Divider, Text} from "@chakra-ui/react";
import OtherUserChatTile from "./otherUserChatTile";


const OtherUsersList = (
    {
        isLoadingOtherUsers,
        otherUsers,
        active,
        currentUser,
        handleActive,
        onlineUsers,
        conversations
    }
) => {
    if (isLoadingOtherUsers) {
        return (
            <Text mt={5}>
                Loading conversations...
            </Text>
        );
    }

    return (
        <>
            {
                otherUsers?.length > 0 && (
                    <>
                        <Divider mt={5}/>
                        <Text ml={5} mt={4} fontWeight="bold" color="brand.800">Other Users</Text>
                    </>
                )
            }

            {
                otherUsers?.map(user => (
                    <OtherUserChatTile
                        key={user.id}
                        active={active}
                        currentUser={currentUser}
                        handleActive={handleActive}
                        user={user}
                        onlineUsers={onlineUsers}
                        conversations={conversations}
                    />
                ))
            }
        </>
    );
};

export default OtherUsersList;