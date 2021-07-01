import mongoose, {Schema} from "mongoose";

const conversationSchema: Schema = new mongoose.Schema({
    members: {
        type: Array
    },
    blockedBy: String
}, {timestamps: true});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;