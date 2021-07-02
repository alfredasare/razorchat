import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Avatar, AvatarBadge, Button, Flex, Text} from "@chakra-ui/react";
import useSocket from "../../hooks/useSocket";
import {createStructuredSelector} from "reselect";
import {selectAllConversations} from "../../redux/conversation/conversation.selectors";
import {blockUserStart, setChattingWith} from "../../redux/conversation/conversation.actions";


const ConversationInfo = (
    {
        chattingWith,
        conversations,
        currentUser,
        updatedConversation,
        blockUser,
        setChattingWith
    }
) => {
    const {socket} = useSocket();
    const [isBlocked, setIsBlocked] = useState(true);

    const conversation = conversations?.find(conversation => (
        conversation.members.includes(currentUser.id) && conversation.members.includes(chattingWith.id)
    ));

    const receiverId = conversation.members.find(id => id !== currentUser.id);

    useEffect(() => {
        if (!!updatedConversation?.isBlocked || conversation?.blockedBy) {

            setIsBlocked(true);

            if (
                updatedConversation?.userToBlock === currentUser.id &&
                updatedConversation?.conversationId === chattingWith.conversationId
            ) {
                setChattingWith(null);
            }

        } else {
            setIsBlocked(false);
        }

        // eslint-disable-next-line
    }, [updatedConversation]);

    const handleBlock = () => {
        if (!isBlocked) {
            socket.current.emit("blockUser", {
                senderId: currentUser.id,
                userToBlock: receiverId,
                isBlocked: true,
                conversationId: chattingWith.conversationId
            });
        } else {
            socket.current.emit("unblockUser", {
                senderId: currentUser.id,
                userToUnblock: receiverId,
                isBlocked: false,
                conversationId: chattingWith.conversationId
            });
        }
        blockUser({
            senderId: currentUser.id,
            userToBlock: receiverId
        });
    };

    return (
        <Flex
            flex="0 0 60px"
            alignItems="center"
            justifyContent="space-between"
            py={2}
        >
            <Flex
                alignItems="center"
            >
                <Avatar ml={5} size="md" name={chattingWith.username}>
                    <AvatarBadge boxSize="1em" bg="green.500"/>
                </Avatar>
                <Text ml={4} textTransform="capitalize">
                    {chattingWith.username}
                </Text>
            </Flex>
            <Button
                mr={5}
                color="brand.400"
                textTransform="capitalize"
                onClick={handleBlock}
            >
                {
                    `${(
                        !isBlocked
                    ) 
                        ? 'Block' 
                        : 'Unblock'} ${chattingWith.username}`
                }
            </Button>
        </Flex>
    );
};

const mapStateToProps = createStructuredSelector({
    conversations: selectAllConversations
});

const mapDispatchToProps = dispatch => ({
    blockUser: payload => dispatch(blockUserStart(payload)),
    setChattingWith: user => dispatch(setChattingWith(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationInfo);