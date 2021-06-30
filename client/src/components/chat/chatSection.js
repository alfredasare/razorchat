import {Avatar, AvatarBadge, Box, Button, Divider, Flex, Text} from "@chakra-ui/react";
import {v4} from "uuid";
import ChatBubble from "./chatBubble";
import MessageForm from "./messageForm";
import {useEffect, useRef} from "react";


const ChatSection = ({chattingWith, currentUser, isLoadingMessages, messages, socket}) => {
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    return (
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
                        <AvatarBadge boxSize="1em" bg="green.500"/>
                    </Avatar>
                    <Text ml={4} textTransform="capitalize">
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