import {useEffect} from "react";
import {connect} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";
import {
    Button,
    Divider,
    Heading,
    Text
} from "@chakra-ui/react";
import Email from "./svg/email";
import {createStructuredSelector} from "reselect";
import {clearAuthStatus} from "../../redux/user/user.actions";


const SignInForm = (
    {
        currentUser,
        isLoading,
        clearAuthProgressStatus
    }
) => {
    const { loginWithRedirect } = useAuth0();

    useEffect(() => {
        return () => {
            clearAuthProgressStatus()
        };

        // eslint-disable-next-line
    }, [currentUser, clearAuthProgressStatus]);

    return (
        <>
            <Heading
                as="h2"
                size="2xl"
                mb={6}
            >
                Login
            </Heading>
            <Text
                fontSize={18}
                fontWeight={500}
                color="rgba(0,0,0,0.8)"
            >
                We take chatting to the next level with our fast, realtime and seamless messaging platform. A whole new
                experience awaits you.
                Just login to have a chatting experience like never before.
            </Text>

            <Divider mt={7}/>

            <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Signing in..."
                leftIcon={<Email/>}
                backgroundColor="brand.400"
                color="brand.100"
                borderRadius={50}
                width="100%"
                px={20}
                py={7}
                mt={6}
                _hover={{
                    backgroundColor: "brand.500"
                }}
                _focus={{
                    boxShadow: "0 0 0 3px #FD455A !important"
                }}
                onClick={() => loginWithRedirect()}
            >
                Get started
            </Button>

            <Text
                fontSize={15}
                fontWeight={500}
                color="rgba(150,150,150,1.0)"
                textAlign="center"
                mt={5}
            >
                Once you sign up you are agreeing to all our terms and conditions
            </Text>
        </>
    );
};

const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = dispatch => ({
    clearAuthProgressStatus: () => dispatch(clearAuthStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);