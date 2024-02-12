import React from "react"
import { useDispatch, useSelector } from "react-redux"
import classes from './OnlineUsers.module.scss'

const OnlineUsers = () => {
    const dispatch = useDispatch();
    const onlineUsers = useSelector((state) => state.users.onlineUsers)

    return (
        <div className={classes.onlineUsers}>
            <h2>Пользователи чата:</h2>
            {onlineUsers.map((user, index) => (
                <div className={classes.userItem} key={index}>{user.name}</div>
            ))}
        </div>
    )
}

export default OnlineUsers