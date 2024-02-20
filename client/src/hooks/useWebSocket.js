import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../store/users/usersSlice"
import { addMessage } from "../store/messages/messagesSlice"

const useWebSocket = (username) => {
    const [messages, setMessages] = useState([])
    const socket = useRef()
    const [connected, setConnected] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, []);

    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true);
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            };
            socket.current.send(JSON.stringify(message));
        };

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);

            console.log(message)
            if (Array.isArray(message)) {
                dispatch(addUser(message));
            } else {
                // dispatch(addMessage(message))
                setMessages(prev => [message, ...prev]);
            }
        };

        socket.current.onclose = () => setConnected(false);
        socket.current.onerror = () => console.log('Socket произошла ошибка');
    };

    const sendMessage = (message) => {
        if (!connected) return;

        const messageObject = {
            username,
            message,
            id: Date.now(),
            event: 'message'
        };
        socket.current.send(JSON.stringify(messageObject));
    };

    return { connected, messages, connect, sendMessage };

}

export default useWebSocket