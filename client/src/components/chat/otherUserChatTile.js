import {
    Flex,
    Text,
    Avatar,
    Spacer, AvatarBadge
} from "@chakra-ui/react";

const OtherUserChatTile = (
    {
        active,
        handleActive,
        user,
        currentUser,
        onlineUsers
    }
) => {
    const filterUsers = onlineUsers.filter(user => user.userId !== currentUser.id);
    const isOnline = filterUsers.some(filteredUser => filteredUser.userId === user.id);

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
                handleActive(user.id)
            }}
        >
            <Avatar size="md" name={user.username}>
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

export default OtherUserChatTile;