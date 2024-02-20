import React, { useState } from "react"
import classes from './LoginForm.module.scss'
import classNames from "classnames"
import { useDispatch } from "react-redux"
import { addUser } from "../../store/users/usersSlice"

const LoginForm = ({ username, setUsername, connect }) => {
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch()

    const handleConnect = () => {
        if (username.trim()) {
            setIsError(false);
            connect();
            // const users = JSON.parse(localStorage.getItem('users')) || [];
            // localStorage.setItem('users', JSON.stringify([...users, {name: username}]))
            // dispatch(addUser({name: username}))

        } else {
            setIsError(true);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleConnect();
        }
    };

    const handleChange = (e) => {
        if (isError) setIsError(false);
        setUsername(e.target.value);
    };

    return (
        <div className={classes.form}>
                <input
                    value={username}
                    onChange={handleChange}
                    type='text'
                    className={classNames(classes.input, {[classes.inputError]: isError})}
                    onKeyDown={handleKeyDown}
                    placeholder='Введите своё имя' />
                {isError && <div className={classes.errorMessage}>Поле не может быть пустым</div>}

            <button className={classes.button} onClick={handleConnect}>Войти</button>
        </div>
    )
}

export default LoginForm;