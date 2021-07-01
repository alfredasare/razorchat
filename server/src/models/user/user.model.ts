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

async function blockUserWithEmail(email: string, emailToBlock: string) {
    const user:  any = await getUserByEmail(email);
    const blockedUsers: string[] = user.blockedUsers || [];
    user.blockedUsers = [...blockedUsers, emailToBlock];
    await user.save();
}

async function unblockUserWithEmail(email: string, emailToUnblock: string) {
    const user:  any = await getUserByEmail(email);
    const blockedUsers: string[] = user.blockedUsers || [];
    user.blockedUsers = blockedUsers.filter((email:string) => email !== emailToUnblock);
    await user.save();
}


export {
    getUserByEmail,
    getUserById,
    getAllUsers,
    blockUserWithEmail,
    unblockUserWithEmail
};