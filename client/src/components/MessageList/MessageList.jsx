import React, { useEffect, useRef } from "react"
import classes from './MessageList.module.scss'
import { useSelector } from "react-redux"

const MessageList = ({ messages, value }) => {
    const textareaRef = useRef(null);
    const savedUsername = localStorage.getItem('chatUsername');
    const savedMessages = useSelector(state => state.messages.messages)

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [value]);

    return (
        <div className={classes.messages}>
            {messages.map(mess =>
                <div key={mess.id}>
                    {mess.event === 'connection'
                        ?   <div className={classes.connectionMessage}>
                                Пользователь <span>{mess.username ? mess.username : savedUsername}</span> подключился
                            </div>
                        :   <div className={classes.message}>
                                <span>{mess.username}</span>: {mess.message}
                            </div>
                    }
                </div>
            )}
        </div>
    )
}

export default MessageList;