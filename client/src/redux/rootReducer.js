import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import userReducer from "./user/user.reducer";
import conversationReducer from "./conversation/conversation.reducer";
import messagesReducer from "./message/message.reducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
};

const rootReducer = combineReducers({
    user: userReducer,
    conversation: conversationReducer,
    messages: messagesReducer
});

export default persistReducer(persistConfig, rootReducer);