import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import userReducer from "./user/user.reducer";
import conversationReducer from "./conversation/conversation.reducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
};

const rootReducer = combineReducers({
    user: userReducer,
    conversation: conversationReducer
});

export default persistReducer(persistConfig, rootReducer);