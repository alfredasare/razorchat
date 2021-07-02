import {useState, useEffect} from "react";
import {connect} from "react-redux";
import {
    Container,
    Flex,
    Grid,
    Heading,
    Text
} from "@chakra-ui/react";
import SearchForm from "../searchForm";
import ProfileInfo from "../profileInfo";
import {createStructuredSelector} from "reselect";
import {
    selectAllConversations, selectChattingWith,
    selectIsLoadingConversations
} from "../../../redux/conversation/conversation.selectors";
import {getConversationsStart} from "../../../redux/conversation/conversation.actions";
import {selectAllUsers, selectCurrentUser, selectIsLoadingAllUsers} from "../../../redux/user/user.selectors";
import {selectAllMessages, selectIsLoadingMessages} from "../../../redux/message/message.selectors";
import {sendMessageSuccess} from "../../../redux/message/message.actions";
import {getAllUsersStart} from "../../../redux/user/user.actions";
import ChatSection from "../chatSection";
import ConversationsList from "../conversationsList";
import OtherUsersList from "../otherUsersList";
import useSocket from "../../../hooks/useSocket";

const DesktopChat = (
    {
        user,
        conversations,
        isLoadingConversations,
        getConversations,
        currentUser,
        isLoadingMessages,
        messages,
        chattingWith,
        sendMessage,
        getOtherUsers,
        otherUsers,
        isLoadingOtherUsers
    }
) => {
    const [active, setActive] = useState("");
    const [onlineUsers, setOnlineUsers] = useState([]);

    const {socket, newMessage, updatedConversation} = useSocket();

    useEffect(() => {

    }, [updatedConversation]);

    useEffect(() => {
        if (currentUser) {
            getConversations(currentUser.id);
        }
    }, [currentUser, getConversations]);

    useEffect(() => {
        if (!isLoadingConversations) {
            getOtherUsers({
                userId: currentUser.id,
                conversations
            });
        }

        // eslint-disable-next-line
    }, [isLoadingConversations]);

    useEffect(() => {
        if (newMessage && chattingWith?.conversationId === newMessage?.conversationId) {
            sendMessage(newMessage);
        }

        //  eslint-disable-next-line
    }, [newMessage]);

    useEffect(() => {
        currentUser && socket.current.emit("addUser", currentUser?.id);
        socket.current.on("getUsers", users => {
            setOnlineUsers(users);
        });

        // eslint-disable-next-line
    }, [currentUser]);

    const handleActive = (chatTileId) => {
        setActive(chatTileId);
    };

    return (
        <Grid
            gridTemplateColumns="1fr 2fr"
            h="100%"
            w="100%"
            display={["none", "grid"]}
            overflowY="hidden"
        >
            <Container
                borderRight="1px solid rgba(0,0,0,0.1)"
                overflowY="scroll"
            >
                <ProfileInfo name={user.name} email={user.email}/>
                <Heading
                    as="h2"
                    size="xl"
                    py={3}
                >
                    Chats
                </Heading>

                <SearchForm />

                <ConversationsList
                    isLoadingConversations={isLoadingConversations}
                    conversations={conversations}
                    active={active}
                    handleActive={handleActive}
                    currentUser={currentUser}
                    onlineUsers={onlineUsers}
                    updatedConversation={updatedConversation}
                />

                <OtherUsersList
                    conversations={conversations}
                    active={active}
                    handleActive={handleActive}
                    currentUser={currentUser}
                    onlineUsers={onlineUsers}
                    otherUsers={otherUsers}
                    isLoadingOtherUsers={isLoadingOtherUsers}
                />


            </Container>

            {
                !chattingWith
                    ? (
                        <Flex
                            direction="column"
                            flex="1 0 auto"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text fontSize={21} color="brand.800">
                                Select any conversation to show messages here
                            </Text>
                        </Flex>
                    )
                    : (
                        <ChatSection
                            chattingWith={chattingWith}
                            currentUser={currentUser}
                            messages={messages}
                            isLoadingMessages={isLoadingMessages}
                            socket={socket}
                            updatedConversation={updatedConversation}
                            onlineUsers={onlineUsers}
                        />
                    )
            }
        </Grid>
    );
};

const mapStateToProps = createStructuredSelector({
    conversations: selectAllConversations,
    isLoadingConversations: selectIsLoadingConversations,
    currentUser: selectCurrentUser,
    isLoadingMessages: selectIsLoadingMessages,
    messages: selectAllMessages,
    chattingWith: selectChattingWith,
    otherUsers: selectAllUsers,
    isLoadingOtherUsers: selectIsLoadingAllUsers
});

const mapDispatchToProps = dispatch => ({
    getConversations: userId => dispatch(getConversationsStart(userId)),
    sendMessage: message => dispatch(sendMessageSuccess(message)),
    getOtherUsers: payload => dispatch(getAllUsersStart(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(DesktopChat);