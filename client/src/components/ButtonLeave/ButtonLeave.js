import React from "react"
import classes from './ButtonLeave.module.scss'

const ButtonLeave = ({disconnect}) => {

    return (
        <button className={classes.ButtonLeave} onClick={disconnect}>
            Выйти из чата
        </button>
    )
}

export default ButtonLeave