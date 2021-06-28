import {useState, useEffect} from "react";
import {connect} from "react-redux";
import {
    Container,
    Flex,
    Grid,
    Heading,
    Avatar,
    Text,
    Divider,
    Button, AvatarBadge
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
import {selectCurrentUser} from "../../../redux/user/user.selectors";
import {selectAllMessages, selectIsLoadingMessages} from "../../../redux/message/message.selectors";

const DesktopChat = (
    {
        user,
        conversations,
        isLoadingConversations,
        getConversations,
        currentUser,
        isLoadingMessages,
        messages,
        chattingWith
    }
) => {
    useEffect(() => {
        if (currentUser) {
            getConversations(currentUser.id);
        }
    }, [currentUser, getConversations]);

    const [active, setActive] = useState("");

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
                    ) : conversations.map((item) => (
                        <ChatTile
                            key={item._id}
                            conversation={item}
                            active={active}
                            currentUser={currentUser}
                            handleActive={handleActive}
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
                                                    <ChatBubble
                                                        key={message._id}
                                                        position={currentUser.id === message.sender ? 'right' : 'left' }
                                                        message={message.text}
                                                        time="30 mins ago"
                                                    />
                                                ))
                                            )
                                    }
                                </Flex>
                            </Flex>

                            <Divider/>

                            <Flex
                                flex="0 0 65px"
                            >
                                <MessageForm currentUser={currentUser} />
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
    chattingWith: selectChattingWith
});

const mapDispatchToProps = dispatch => ({
    getConversations: userId => dispatch(getConversationsStart(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(DesktopChat);