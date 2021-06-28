import MessageActionTypes from "./message.types";

const INITIAL_STATE = {
    messages: [],
    isLoadingMessages: false,
    messagesError: ''
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

        default:
            return state;
    }
};

export default messagesReducer;