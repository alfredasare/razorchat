import {useEffect} from "react";
import {connect} from "react-redux";
import {
    Flex,
    Text,
    Avatar,
    Spacer, AvatarBadge
} from "@chakra-ui/react";
import {getUserByIdStart} from "../../redux/user/user.actions";
import {createStructuredSelector} from "reselect";
import {selectAllConversationUsers, selectLoadingUserById, selectUserById} from "../../redux/user/user.selectors";
import {getMessagesStart} from "../../redux/message/message.actions";
import {setChattingWith} from "../../redux/conversation/conversation.actions";

const ChatTile = (
    {
        active,
        handleActive,
        conversation,
        currentUser,
        allConversationUsers,
        getUserById,
        getMessages,
        setChattingWith,
        onlineUsers
    }
) => {

    const otherUserId = conversation.members.find(id => id !== currentUser.id);
    const userById = allConversationUsers.find(user => user.id === otherUserId);

    const filterUsers = onlineUsers.filter(user => user.userId !== currentUser.id);
    const isOnline = filterUsers.some(filteredUser => filteredUser.userId === userById?.id);

    useEffect(() => {
        getUserById(otherUserId);

    }, [otherUserId, getUserById]);

    const handleSetConversation = (conversationId) => {
        setChattingWith({...userById, conversationId});
        getMessages(conversationId);
    };

    return (
        <Flex
            direction="row"
            mt={4}
            py={3}
            px={5}
            cursor="pointer"
            backgroundColor={active === conversation._id ? "brand.300" : "brand.100"}
            borderRadius={30}
            _hover={{
                backgroundColor: "brand.300"
            }}
            onClick={() => {
                handleActive(conversation._id)
                handleSetConversation(conversation._id)
            }}
        >
            <Avatar size="md" name={userById?.username}>
                <AvatarBadge boxSize="1em" bg={isOnline ? "green" : "red"} />
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
                        !userById
                            ? `Loading...`
                            : userById?.username
                    }
                </Text>
            </Flex>
            <Spacer/>
        </Flex>
    );
};

const mapStateToProps = createStructuredSelector({
    allConversationUsers: selectAllConversationUsers,
    isLoadingUserById: selectLoadingUserById
});

const mapDispatchToProps = dispatch => ({
    getUserById: id => dispatch(getUserByIdStart(id)),
    getMessages: id => dispatch(getMessagesStart(id)),
    setChattingWith: user => dispatch(setChattingWith(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatTile);