import {useEffect, useRef} from "react";
import {Box, Divider, Flex, Text} from "@chakra-ui/react";
import {v4} from "uuid";
import ChatBubble from "./chatBubble";
import MessageForm from "./messageForm";
import ConversationInfo from "./conversationInfo";


const ChatSection = ({chattingWith, currentUser, isLoadingMessages, messages, socket, updatedConversation}) => {
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    return (
        <Flex
            direction="column"
            flex="1 0 auto"
        >
            <ConversationInfo chattingWith={chattingWith} currentUser={currentUser} updatedConversation={updatedConversation}/>

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
                                            position={currentUser.id === message.sender ? 'right' : 'left'}
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
    );
};

export default ChatSection