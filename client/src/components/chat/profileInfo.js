import {connect} from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {
    Flex,
    Avatar,
    Text,
    Link
} from "@chakra-ui/react";

const ProfileInfo = ({name, email}) => {
    const { logout } = useAuth0();

    return (
        <Flex
            direction={["column", "column", "column", "row"]}
            w="100%"
            justifyContent="space-between"
            alignItems="center"
        >
            <Flex
                alignItems="center"
                py={4}
            >
                <Avatar name={name}/>
                <Text ml={5}>{email}</Text>
            </Flex>
            <Link
                fontSize={13}
                _hover={{
                    color: "brand.400",
                }}
                onClick={() => logout({ returnTo: `${window.location.origin}/signin` })}
            >
                Logout
            </Link>
        </Flex>
    );
};

const mapDispatchToProps = dispatch => ({

});

export default connect(null, mapDispatchToProps)(ProfileInfo);