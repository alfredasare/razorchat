import User from "./user.mongo";

async function getUserByEmail(email: string) {
    return User.findOne({email}, {
        email: 1,
        username: 1,
        client_id: 1,
        blockedUsers: 1
    });
}

async function getUserById(id: string) {
    return User.findById(id, {
        email: 1,
        username: 1,
        client_id: 1,
        blockedUsers: 1
    });
}

async function getAllUsers() {
    return User.find({}, {
        email: 1,
        username: 1,
        client_id: 1,
        blockedUsers: 1
    });
}


export {
    getUserByEmail,
    getUserById,
    getAllUsers
};