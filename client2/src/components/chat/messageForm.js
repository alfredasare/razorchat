import {
    Flex,
    FormControl,
    Textarea,
    IconButton
} from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import MessageIcon from "./svg/messageIcon";

const MessageForm = () => {

    return (
        <form
            style={{
                width: "90%",
                margin: "auto",
                padding: "10px 0"
            }}
        >
            <Flex
                w="100%"
            >
                <FormControl id="message" isRequired>
                    <Textarea
                        type="message"
                        name="message"
                        borderRadius={50}
                        placeholder="Write a message..."
                        resize="none"
                        overflow="hidden"
                        minH="unset"
                        px={8}
                        py={3}
                        w="100%"
                        minRows={1}
                        as={ResizeTextarea}
                        _focus={{
                            borderColor: "brand.200",
                            boxShadow: "0 0 0 1px #000000 !important",
                            zIndex: 1
                        }}
                    />
                </FormControl>
                <IconButton
                    aria-label="Send message"
                    icon={<MessageIcon />}
                    borderRadius={50}
                    size="lg"
                    backgroundColor="brand.300"
                    ml={5}
                />
            </Flex>
        </form>
    );
};

export default MessageForm;