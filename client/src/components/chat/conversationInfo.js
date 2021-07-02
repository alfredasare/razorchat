import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Avatar, AvatarBadge, Button, Flex, Text} from "@chakra-ui/react";
import useSocket from "../../hooks/useSocket";
import {createStructuredSelector} from "reselect";
import {selectAllConversations} from "../../redux/conversation/conversation.selectors";


const ConversationInfo = ({chattingWith, conversations, currentUser, updatedConversation}) => {
    const {socket} = useSocket();
    const [isBlocked, setIsBlocked] = useState(true);

    const conversation = conversations?.find(conversation => (
        conversation.members.includes(currentUser.id) && conversation.members.includes(chattingWith.id)
    ));

    const receiverId = conversation.members.find(id => id !== currentUser.id);

    useEffect(() => {
        if (!!updatedConversation?.isBlocked) {
            setIsBlocked(true);
        } else {
            setIsBlocked(false);
        }
    }, [updatedConversation]);

    const handleBlock = () => {
        if (!isBlocked) {
            console.log('block')
            console.log(isBlocked);
            socket.current.emit("blockUser", {
                senderId: currentUser.id,
                userToBlock: receiverId,
                isBlocked: true,
                conversationId: chattingWith.conversationId
            });
        } else {
            console.log('unblock')
            socket.current.emit("unblockUser", {
                senderId: currentUser.id,
                userToUnblock: receiverId,
                isBlocked: false,
                conversationId: chattingWith.conversationId
            });
        }
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
                {`${!isBlocked ? 'Block' : 'Unblock'} ${chattingWith.username}`}
            </Button>
        </Flex>
    );
};

const mapStateToProps = createStructuredSelector({
    conversations: selectAllConversations
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationInfo);