import {
    Flex,
    Text,
    Avatar,
    Spacer
} from "@chakra-ui/react";

const ChatTile = ({name, lastMessage, sent, active, handleActive, id}) => {

    return (
        <Flex
            direction="row"
            mt={4}
            py={3}
            px={5}
            cursor="pointer"
            backgroundColor={active === id ? "brand.300" : "brand.100"}
            borderRadius={30}
            _hover={{
                backgroundColor: "brand.300"
            }}
            onClick={() => {handleActive(id)}}
        >
            <Avatar size="md" name={name}/>
            <Flex
                direction="column"
                ml={4}
            >
                <Text
                    noOfLines={1}
                    isTruncated
                    whiteSpace="none"
                    maxW={180}
                >
                    {name}
                </Text>
                <Text
                    noOfLines={1}
                    isTruncated
                    whiteSpace="none"
                    maxW={180}
                >
                    {lastMessage}
                </Text>
            </Flex>
            <Spacer/>
            <Text mt={2.5}>
                {sent} ago
            </Text>
        </Flex>
    );
};

export default ChatTile;