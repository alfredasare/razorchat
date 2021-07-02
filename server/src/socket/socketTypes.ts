export interface UsersArray {
    userId: string
    socketId: string
}

export interface SendMessage {
    senderId: string
    receiverId: string
    conversationId: string
    text: string
}

export interface BlockUser {
    senderId: string
    userToBlock?: string
    userToUnblock?: string
    conversationId?: string
}