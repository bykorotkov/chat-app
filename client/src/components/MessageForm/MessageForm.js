import React, { useEffect, useRef, useState } from "react"
import classes from './MessageForm.module.scss'
import classNames from "classnames"

const MessageForm = ({ value, setValue, sendMessage }) => {
    const [isError, setIsError] = useState(false);
    const textareaRef = useRef(null);

    const handleSendMessage = () => {
        if (value.trim()) {
            setIsError(false);
            sendMessage()
        } else {
            setIsError(true)
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    const handleChange = (e) => {
        if (isError) setIsError(false);
        setValue(e.target.value)
    }

    return (
        <div className={classes.form}>
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                className={classNames(classes.input, {[classes.inputError]: isError})}
                onKeyDown={handleKeyDown}
                placeholder='Введите сообщение' />
            {isError && <div className={classes.errorMessage}>Поле не может быть пустым</div>}
            <button className={classes.button} onClick={handleSendMessage}>Отправить сообщение</button>
        </div>
    )
}

export default MessageForm;