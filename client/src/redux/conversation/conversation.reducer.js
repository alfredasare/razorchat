import ConversationActionTypes from "./conversation.types";

const INITIAL_STATE = {
    conversations: [],
    isLoadingConversations: false,
    conversationsError: '',
    chattingWith: null
};

const conversationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ConversationActionTypes.GET_ALL_CONVERSATIONS_START:
            return {
                ...state,
                isLoadingConversations: true,
                conversationsError: ''
            };

        case ConversationActionTypes.GET_ALL_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                isLoadingConversations: false,
                conversationsError: '',
                conversations: action.payload
            };

        case ConversationActionTypes.GET_ALL_CONVERSATIONS_FAILURE:
            return {
                ...state,
                isLoadingConversations: false,
                conversationsError: action.payload
            };

        case ConversationActionTypes.SET_CHATTING_WITH:
            return {
                ...state,
                chattingWith: action.payload
            };

        default:
            return state;
    }
};

export default conversationReducer;