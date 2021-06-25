import {Flex, Heading, Spacer, Link, Box} from "@chakra-ui/react";
import {Link as ReactLink} from 'react-router-dom';

const HeaderComponent = ({isAuthenticated}) => {

    return (
        <Box position="fixed" display="contents">
            <Flex mx={10} my={5}>
                <Heading
                    as={ReactLink}
                    to="/"
                    size="lg"
                    color="brand.400"
                >
                    razorchat
                </Heading>
                <Spacer/>
                {
                    isAuthenticated ? (
                        <Link
                            as={ReactLink}
                            to={`/chat`}
                            fontSize={18}
                            fontWeight="bold"
                            lineHeight={1.8}
                            _hover={{
                                color: "brand.400",
                            }}
                        >
                            Go to Chat
                        </Link>
                    ) : (
                        <Link
                            as={ReactLink}
                            to="/signin"
                            fontSize={18}
                            fontWeight="bold"
                            lineHeight={1.8}
                            _hover={{
                                color: "brand.400",
                            }}
                        >
                            Sign In
                        </Link>
                    )
                }
            </Flex>
        </Box>
    );
};

export default HeaderComponent;