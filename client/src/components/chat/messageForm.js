import {useState} from "react";
import {connect} from "react-redux";
import {
    Flex,
    FormControl,
    Textarea,
    IconButton
} from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import MessageIcon from "./svg/messageIcon";
import {sendMessageStart} from "../../redux/message/message.actions";
import useForm from "../../hooks/useForm";
import {createStructuredSelector} from "reselect";
import {selectChattingWith} from "../../redux/conversation/conversation.selectors";

const MessageForm = ({sendMessage, currentUser, chattingWith, socket}) => {

    const [formData, setFormData] = useState({
        message: ''
    });

    const {handleChange} = useForm(formData, setFormData);

    const handleSubmit = e => {
        e.preventDefault();
        sendMessage({
            conversationId: chattingWith.conversationId,
            sender: currentUser.id,
            text: formData.message
        });
        socket.current.emit("sendMessage", {
            senderId: currentUser.id,
            receiverId: chattingWith.id,
            conversationId: chattingWith.conversationId,
            text: formData.message
        });
        setFormData({...formData, message: ''});
    };

    return (
        <form
            style={{
                width: "90%",
                margin: "auto",
                padding: "10px 0"
            }}
            onSubmit={handleSubmit}
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
                        onChange={handleChange}
                        value={formData.message}
                    />
                </FormControl>
                <IconButton
                    aria-label="Send message"
                    icon={<MessageIcon />}
                    borderRadius={50}
                    size="lg"
                    backgroundColor="brand.300"
                    ml={5}
                    onClick={handleSubmit}
                />
            </Flex>
        </form>
    );
};

const mapStateToProps = createStructuredSelector({
    chattingWith: selectChattingWith
});

const mapDispatchToProps = dispatch => ({
    sendMessage: payload => dispatch(sendMessageStart(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);