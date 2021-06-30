import ConversationActionTypes from "./conversation.types";

const INITIAL_STATE = {
    conversations: [],
    isLoadingConversations: true,
    conversationsError: '',
    chattingWith: null,
    isCreatingConversation: true,
    createConversationError: ''
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

        case ConversationActionTypes.CREATE_CONVERSATION_START:
            return {
                ...state,
                isCreatingConversation: true,
                conversationsError: ''
            };

        case ConversationActionTypes.CREATE_CONVERSATION_SUCCESS:
            return {
                ...state,
                isCreatingConversation: false,
                conversationsError: '',
                conversations: state.conversations.concat(action.payload)
            };

        case ConversationActionTypes.CREATE_CONVERSATION_FAILURE:
            return {
                ...state,
                isCreatingConversation: false,
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