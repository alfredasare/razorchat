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
    Button
} from "@chakra-ui/react";
import ChatTile from "../chatTile";
import MessageForm from "../messageForm";
import ChatBubble from "../chatBubble";
import SearchForm from "../searchForm";
import ProfileInfo from "../profileInfo";
import {createStructuredSelector} from "reselect";
import {
    selectAllConversations,
    selectIsLoadingConversations
} from "../../../redux/conversation/conversation.selectors";
import {getConversationsStart} from "../../../redux/conversation/conversation.actions";
import {selectCurrentUser} from "../../../redux/user/user.selectors";

const DesktopChat = (
    {
        user,
        conversations,
        isLoadingConversations,
        getConversations,
        currentUser,
        getUserById,
        isLoadingUserById,
        userById
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
                        <Avatar ml={5} size="md" name="Pokuah"/>
                        <Text ml={4}>
                            Pokuah
                        </Text>
                    </Flex>
                    <Button
                        mr={5}
                        color="brand.400"
                    >
                        Block Pokuah
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
                        <ChatBubble position="left" message="Hello. How are you doing?
                        Hello. How are you doing? Hello. How are you doing?
                        Hello. How are you doing? Hello. How are you doing?
                        Hello. How are you doing? Hello. How are you doing?" time="2m ago"/>
                        <ChatBubble position="left" message="Hello. How are you doing?" time="2m ago"/>
                        <ChatBubble position="right" message="I saw you" time="50s ago"/>
                        <ChatBubble position="right" message="Around the coffee shop" time="50s ago"/>
                        <ChatBubble position="left" message="Really?" time="50s ago"/>
                        <ChatBubble position="left" message="When?" time="50s ago"/>
                        <ChatBubble position="right" message="Around 12pm" time="50s ago"/>
                        <ChatBubble position="right" message="You were walking with Fidel" time="50s ago"/>
                        <ChatBubble position="left" message="Oh ok" time="50s ago"/>
                    </Flex>
                </Flex>

                <Divider/>

                <Flex
                    flex="0 0 65px"
                >
                    <MessageForm/>
                </Flex>
            </Flex>
        </Grid>
    );
};

const mapStateToProps = createStructuredSelector({
    conversations: selectAllConversations,
    isLoadingConversations: selectIsLoadingConversations,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    getConversations: userId => dispatch(getConversationsStart(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(DesktopChat);