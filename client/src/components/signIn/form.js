import {
    Container,
    Flex,
    Heading
} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import SignInForm from "./signInForm";

const Form = () => {
    return (
        <Container
            paddingInlineStart={0}
            paddingInlineEnd={0}
        >
            <Flex
                direction="column"
                justifyContent="center"
                h={["100%", "100%", "100vh"]}
                py={[12]}
                w="90%"
                ml="5%"
            >
                <Heading
                    as={ReactLink}
                    to="/"
                    size="md"
                    mb={5}
                    color="brand.400"
                >
                    razorchat
                </Heading>
                <SignInForm />
            </Flex>

        </Container>
    );
};

export default Form;