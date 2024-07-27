import React from "react"
import classes from './OnlineUsers.module.scss'
import { useSelector } from "react-redux"

const OnlineUsers = () => {
    const onlineUsers = useSelector((state) => state.users.onlineUsers)

    return (
        <div className={classes.onlineUsers}>
            <h2>Пользователи чата:</h2>
            {onlineUsers.map((user, index) => (
                <div className={classes.userItem} key={index}>{index + 1}. {user}</div>
            ))}
        </div>
    )
}

export default OnlineUsers