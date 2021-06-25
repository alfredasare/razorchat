import {Flex, Text} from "@chakra-ui/react";

const ChatBubble = ({position, message, time}) => {

    return (
        <Flex
            direction="row"
            justifyContent={position === 'left'? 'flex-start': 'flex-end'}
        >
            <Flex
                direction="column"
            >
                <Text
                    mb={1}
                    backgroundColor="brand.300"
                    px={8}
                    py={4}
                    borderRadius="50"
                    maxW="30vw"
                >
                    {message}
                </Text>
                <Text mb={5} fontSize={12} textAlign={position}>
                    {time}
                </Text>
            </Flex>
        </Flex>
    );
};

export default ChatBubble;