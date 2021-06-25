import {Box, Grid} from "@chakra-ui/react";
import Form from "./form";
import SignInIllustration from "./svg/signInIllustration";

const SignInComponent = () => {
    return (
        <Grid
            h="100vh"
            templateColumns={["1fr", null, null, "1fr 1fr"]}
        >
            <Box
                h="100%"
                w="100%"
                backgroundColor="brand.100"
            >
                <Form />
            </Box>
            <Box
                h="100%"
                w="100%"
                overflowX="hidden"
                display={["none", null, null, "block"]}
            >
                <SignInIllustration />
            </Box>
        </Grid>
    );
};

export default SignInComponent;