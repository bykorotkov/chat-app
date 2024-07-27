import React, { useState} from 'react';
import useWebSocket from "../../hooks/useWebSocket"
import LoginForm from "../LoginForm/LoginForm"
import MessageForm from "../MessageForm/MessageForm"
import MessageList from "../MessageList/MessageList"
import classes from './WebSocketComponent.module.scss'
import OnlineUsers from "../OnlineUsers/OnlineUsers"
import ButtonLeave from "../ButtonLeave/ButtonLeave"

const WebSocketComponent = () => {
    const [value, setValue] = useState('')
    const [username, setUsername] = useState('')
    const { isConnected, messages, connect: connectSocket, sendMessage: sendWebSocketMessage, disconnect } = useWebSocket(username);

    const handleConnect = () => {
        if (username.trim()) {
            connectSocket();
        }
    };

    const handleDisconnect = () => {
        disconnect()
        setUsername('');
    }

    const sendMessage = () => {
        sendWebSocketMessage(value);
        setValue('');
    };

    if (!isConnected) {
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
            <ButtonLeave disconnect={handleDisconnect}/>
        </div>
    );
};

export default WebSocketComponent;