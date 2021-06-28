import {useEffect} from "react";
import {connect} from "react-redux";
import {
    Flex,
    Text,
    Avatar,
    Spacer
} from "@chakra-ui/react";
import {getUserByIdStart} from "../../redux/user/user.actions";
import {createStructuredSelector} from "reselect";
import {selectLoadingUserById, selectUserById} from "../../redux/user/user.selectors";

const ChatTile = (
    {
        name,
        active,
        handleActive,
        conversation,
        currentUser,
        userById,
        isLoadingUserById,
        getUserById
    }
) => {

    const otherUserId = conversation.members.find(id => id !== currentUser.id);

    useEffect(() => {
        getUserById(otherUserId);

    }, [otherUserId, getUserById]);

    const handleSetConversation = (conversationId) => {
        console.log(userById?.id);
        console.log(conversationId);
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
            <Avatar size="md" name={userById?.username}/>
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
                    {
                        !userById
                            ? `Loading...`
                            : userById?.username
                    }
                </Text>
                <Text
                    noOfLines={1}
                    isTruncated
                    whiteSpace="none"
                    maxW={180}
                >
                    Ok oooo
                </Text>
            </Flex>
            <Spacer/>
            <Text mt={2.5}>
                9m ago
            </Text>
        </Flex>
    );
};

const mapStateToProps = createStructuredSelector({
    userById: selectUserById,
    isLoadingUserById: selectLoadingUserById
});

const mapDispatchToProps = dispatch => ({
    getUserById: id => dispatch(getUserByIdStart(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatTile);