import {Link as ReactLink} from "react-router-dom";
import {Container, Flex, Heading, Link} from "@chakra-ui/react";

const LandingContent = ({isAuthenticated}) => {
    return (
        <Container maxW="4xl">
            <Flex
                h="80vh"
                direction="column"
                textAlign="center"
                alignItems="center"
                justifyContent="center"
            >
                <Heading
                    as="h1"
                    size="2xl"
                    mb={5}
                >Communication made easy.</Heading>
                <Container>
                    <Heading
                        as="h3"
                        size="xl"
                        mb={10}
                        fontWeight={400}
                    >Enjoy seamless conversations with friends and family</Heading>
                </Container>
                <Link
                    as={ReactLink}
                    to={isAuthenticated ? `/chat` : '/signin'}
                    fontSize={20}
                    color="brand.100"
                    borderRadius={6}
                    px={20}
                    py={3}
                    backgroundColor="brand.400"
                    _hover={{
                        textDecoration: "none",
                        backgroundColor: "brand.500"
                    }}
                >
                    Start chatting
                </Link>
            </Flex>
        </Container>
    );
};

export default LandingContent;