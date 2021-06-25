import {useAuth0} from "@auth0/auth0-react";
import HeaderComponent from "../components/header/headerComponent";
import LandingContent from "../components/landing/landingContent";
import Illustration from "../components/landing/illustration";
import {Box} from "@chakra-ui/react";

const Home = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <Box h="100vh" overflowY="hidden" position="relative">
            <HeaderComponent isAuthenticated={isAuthenticated}/>
            <LandingContent isAuthenticated={isAuthenticated}/>
            <Illustration />
        </Box>
    );
};

export default Home;