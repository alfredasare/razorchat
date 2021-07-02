import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";


const useSocket = () => {
    const socket = useRef(null);

    const [newMessage, setNewMessage] = useState(null);
    const [updatedConversation, setUpdatedConversation] = useState(null);

    useEffect(() => {
        socket.current = io('http://localhost:8000');

        socket.current.on("getMessage", data => {
            setNewMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
                conversationId: data.conversationId
            });
        });

        //  eslint-disable-next-line
    }, []);

    useEffect(() => {
        socket.current.on("block", data => {
            setUpdatedConversation({
                senderId: data.senderId,
                userToBlock: data.userToBlock,
                isBlocked: data.isBlocked,
                conversationId: data.conversationId
            });
        });

        socket.current.on("unblock", data => {
            setUpdatedConversation({
                senderId: data.senderId,
                userToUnblock: data.userToUnblock,
                isBlocked: data.isBlocked,
                conversationId: data.conversationId
            });
        });
    }, []);

    return {
        socket,
        newMessage,
        updatedConversation
    };

};

export default useSocket;