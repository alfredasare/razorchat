import { useAuth0 } from "@auth0/auth0-react";
import {Box} from "@chakra-ui/react";
import DesktopChat from "../components/chat/desktopChat/desktopChat";

const Chat = () => {

    const { user } = useAuth0();

    console.log(user);

    return (
        <Box
            backgroundColor="brand.100"
            h="100vh"
        >
            <DesktopChat user={user}/>
        </Box>
    );
};

export default Chat;