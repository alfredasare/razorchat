import MessageActionTypes from "./message.types";

const INITIAL_STATE = {
    messages: [],
    isLoadingMessages: false,
    messagesError: '',
    isSendingMessage: false,
    sendingMessageError: ''
};

const messagesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MessageActionTypes.GET_MESSAGES_START:
            return {
                ...state,
                isLoadingMessages: true,
                messagesError: ''
            };

        case MessageActionTypes.GET_MESSAGES_SUCCESS:
            return {
                ...state,
                isLoadingMessages: false,
                messages: action.payload,
                messagesError: ''
            };

        case MessageActionTypes.GET_MESSAGES_FAILURE:
            return {
                ...state,
                isLoadingMessages: false,
                messagesError: action.payload
            };

        case MessageActionTypes.SEND_MESSAGE_START:
            return {
                ...state,
                isSendingMessage: true,
                sendingMessageError: ''
            };

        case MessageActionTypes.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                isSendingMessage: false,
                sendingMessageError: '',
                messages: state.messages.concat(action.payload)
            };

        case MessageActionTypes.SEND_MESSAGE_FAILURE:
            return {
                ...state,
                isSendingMessage: false,
                sendingMessageError: action.payload
            };

        default:
            return state;
    }
};

export default messagesReducer;