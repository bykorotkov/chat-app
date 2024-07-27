import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { addUser, removeUser } from "../store/users/usersSlice"
import { addMessage } from "../store/messages/messagesSlice"

const useWebSocket = (username) => {
    const [messages, setMessages] = useState([])
    const socket = useRef(null)
    const [isConnected, setIsConnected] = useState(false)
    const dispatch = useDispatch();

    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = handleOpen;
        socket.current.onmessage = handleMessage;
        socket.current.onclose = handleClose;
        socket.current.onerror = handleError;
    };

    const handleOpen = () => {
        const message = {
            event: 'connect',
            username,
        };
        setIsConnected(true);
        socket.current.send(JSON.stringify(message));
    };

    const handleMessage = (event) => {
        const message = JSON.parse(event.data);

        if (Array.isArray(message)) {
            dispatch(addUser(message));
        } else {
            setMessages((prev) => [message, ...prev]);
        }
    };

    const handleClose = () => {
        setIsConnected(false);
    };

    const handleError = () => {
        console.error('WebSocket error occurred');
    };

    const disconnect = () => {
        if (isConnected) {
            const message = {
                event: 'disconnect',
                username
            };
            dispatch(removeUser(message))
            setIsConnected(false)
            socket.current.send(JSON.stringify(message));
        }
    }

    const sendMessage = (message) => {
        if (!isConnected) return;

        const messageObject = {
            username,
            message,
            event: 'message'
        };
        socket.current.send(JSON.stringify(messageObject));
    };

    return { isConnected, messages, connect, sendMessage, disconnect};

}

export default useWebSocket