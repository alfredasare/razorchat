import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";


const useSocket = () => {
    const socket = useRef(null);

    const [newMessage, setNewMessage] = useState(null);

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

    return {
        socket,
        newMessage
    };

};

export default useSocket;