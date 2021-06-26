import mongoose, {Schema} from "mongoose";

const messageSchema: Schema = new mongoose.Schema({
    text: String,
    sender: String,
    conversationId: String
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message;