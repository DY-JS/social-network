import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Header.module.css'

type HeaderPropsType = {
    login: string,
    isAuth: boolean
}

function Header({login, isAuth}: HeaderPropsType) {
    return (
        <header className={styles.header}>
            <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png'/>
            <div className={styles.login}>
                {isAuth ? login : <NavLink to={'/login'}>'LOGIN'</NavLink>}
            </div>
        </header>
    )
}

export default Header