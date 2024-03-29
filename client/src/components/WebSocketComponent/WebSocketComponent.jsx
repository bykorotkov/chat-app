import React, {useEffect, useRef, useState} from 'react';
import useWebSocket from "../../hooks/useWebSocket"
import LoginForm from "../LoginForm/LoginForm"
import MessageForm from "../MessageForm/MessageForm"
import MessageList from "../MessageList/MessageList"
import classes from './WebSocketComponent.module.scss'
import OnlineUsers from "../OnlineUsers/OnlineUsers"

const WebSocketComponent = () => {
    const [value, setValue] = useState('')
    const [username, setUsername] = useState('')
    const { connected, messages, connect: connectSocket, sendMessage: sendWebSocketMessage } = useWebSocket(username);

    const handleConnect = () => {
        if (username.trim()) {
            connectSocket();
        }
    };

    const sendMessage = () => {
        sendWebSocketMessage(value);
        setValue('');
    };

    if (!connected) {
        return <div className={classes.container}>
            <LoginForm username={username} setUsername={setUsername} connect={handleConnect} />
        </div>
    }

    return (
        <div className={classes.container}>
            <OnlineUsers />
            <MessageForm
                value={value}
                setValue={setValue}
                sendMessage={sendMessage}
            />
            <MessageList messages={messages} />
        </div>
    );
};

export default WebSocketComponent;