import {useEffect} from "react";
import {connect} from "react-redux";
import {
    Flex,
    Text,
    Avatar,
    Spacer, AvatarBadge
} from "@chakra-ui/react";
import {getMessagesStart} from "../../redux/message/message.actions";
import {createConversationStart, setChattingWith} from "../../redux/conversation/conversation.actions";
import {createStructuredSelector} from "reselect";
import {selectIsCreatingConversation} from "../../redux/conversation/conversation.selectors";

const OtherUserChatTile = (
    {
        active,
        handleActive,
        user,
        currentUser,
        onlineUsers,
        conversations,
        getMessages,
        setChattingWith,
        createConversation
    }
) => {
    const filterUsers = onlineUsers.filter(user => user.userId !== currentUser.id);
    const isOnline = filterUsers.some(filteredUser => filteredUser.userId === user.id);

    const conversation = conversations.find(conversation => (
        conversation.members.includes(user.id) && conversation.members.includes(currentUser.id)
    ));

    useEffect(() => {

    }, [conversations]);

    const handleCreateConversation = () => {
        if (!conversation) {
            createConversation({
                senderId: currentUser.id,
                receiverId: user.id,
                user
            });
        } else {
            setChattingWith({...user, conversationId: conversation._id});
            getMessages(conversation._id);
        }
    };

    return (
        <Flex
            direction="row"
            mt={1}
            py={3}
            px={5}
            cursor="pointer"
            backgroundColor={active === user.id ? "brand.300" : "brand.100"}
            borderRadius={30}
            _hover={{
                backgroundColor: "brand.300"
            }}
            onClick={() => {
                handleActive(user.id);
                handleCreateConversation();
            }}
        >
            <Avatar size="md" name={user.username}>
                <AvatarBadge boxSize="1em" bg={isOnline ? "green" : "red"}/>
            </Avatar>
            <Flex
                direction="column"
                justifyContent="center"
                ml={4}
            >
                <Text
                    noOfLines={1}
                    isTruncated
                    whiteSpace="none"
                    maxW={180}
                    ml={3}
                    textTransform="capitalize"
                >
                    {
                        !user
                            ? `Loading...`
                            : user.username
                    }
                </Text>
            </Flex>
            <Spacer/>
        </Flex>
    );
};

const mapStateToProps = createStructuredSelector({
    isCreatingConversation: selectIsCreatingConversation
});

const mapDispatchToProps = dispatch => ({
    getMessages: id => dispatch(getMessagesStart(id)),
    setChattingWith: user => dispatch(setChattingWith(user)),
    createConversation: payload => dispatch(createConversationStart(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherUserChatTile);