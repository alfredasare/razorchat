import mongoose, {Schema} from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

const userSchema: Schema = new mongoose.Schema({
    connection: String,
    client_id: String,
    email: String,
    username: String,
    password: String,
    tenant: String,
    transaction: Object,
    request_language: String,
    blockedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    transform: (_document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

const User = mongoose.model('User', userSchema);

export default User;