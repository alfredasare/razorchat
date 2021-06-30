import {useState, useEffect, useRef} from "react";
import {connect} from "react-redux";
import {io} from "socket.io-client";
import {v4} from 'uuid';
import {
    Container,
    Flex,
    Grid,
    Heading,
    Avatar,
    Text,
    Divider,
    Button, AvatarBadge, Box
} from "@chakra-ui/react";
import ChatTile from "../chatTile";
import MessageForm from "../messageForm";
import ChatBubble from "../chatBubble";
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
import OtherUserChatTile from "../otherUserChatTile";

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
    const socket = useRef(null);
    const [newMessage, setNewMessage] = useState(null);

    const scrollRef = useRef();

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
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    useEffect(() => {
        socket.current = io('http://localhost:8000');
        socket.current.on("getMessage", data => {
            setNewMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
                conversationId: data.conversationId
            });
        });

        //  eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (newMessage && chattingWith.conversationId === newMessage.conversationId) {
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

                {
                    isLoadingConversations ? (
                        <Text mt={5}>
                            Loading conversations...
                        </Text>
                    ) : conversations?.map((item) => (
                        <ChatTile
                            key={item._id}
                            conversation={item}
                            active={active}
                            currentUser={currentUser}
                            handleActive={handleActive}
                            onlineUsers={onlineUsers}
                        />
                    ))
                }

                {
                    otherUsers?.length > 0 && (
                        <>
                            <Divider mt={5}/>
                            <Text ml={5} mt={4} fontWeight="bold" color="brand.800">Other Users</Text>
                        </>
                    )
                }

                {
                    isLoadingOtherUsers ? (
                        <Text mt={5}>
                            Loading conversations...
                        </Text>
                    ) : otherUsers?.map(user => (
                        <OtherUserChatTile
                            key={user.id}
                            active={active}
                            currentUser={currentUser}
                            handleActive={handleActive}
                            user={user}
                            onlineUsers={onlineUsers}
                        />
                    ))
                }


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
                        <Flex
                            direction="column"
                            flex="1 0 auto"
                        >
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
                                        <AvatarBadge boxSize="1em" bg="green.500" />
                                    </Avatar>
                                    <Text ml={4}>
                                        {chattingWith.username}
                                    </Text>
                                </Flex>
                                <Button
                                    mr={5}
                                    color="brand.400"
                                >
                                    Block {chattingWith.username}
                                </Button>
                            </Flex>

                            <Divider/>

                            <Flex
                                flex="1 0 100px"
                                h="100%"
                                overflowY="scroll"
                                px={10}
                                py={5}
                            >
                                <Flex
                                    direction="column"
                                    w="100%"
                                >
                                    {
                                        isLoadingMessages
                                            ? (<Text>Loading messages...</Text>)
                                            : (
                                                messages.map(message => (
                                                    <Box ref={scrollRef} key={message._id || v4()}>
                                                        <ChatBubble
                                                            position={currentUser.id === message.sender ? 'right' : 'left' }
                                                            message={message.text}
                                                            time={message.createdAt}
                                                        />
                                                    </Box>
                                                ))
                                            )
                                    }
                                </Flex>
                            </Flex>

                            <Divider/>

                            <Flex
                                flex="0 0 65px"
                            >
                                <MessageForm currentUser={currentUser} socket={socket}/>
                            </Flex>
                        </Flex>
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