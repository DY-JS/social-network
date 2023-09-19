import React from "react";
import styles from './Navbar.module.css'
import { NavLink } from "react-router-dom";

function Navbar() {
    let activeClass = `${styles.nav} ${styles.active}`
    return (
        <nav className={styles.nav}>
            <NavLink className={styles.link} activeClassName={styles.active} to='/profile'>Profile</NavLink>
            <NavLink className={styles.link} activeClassName={styles.active} to='/dialogs'>Messages</NavLink>
            <NavLink className={styles.link} activeClassName={styles.active} to='/music'>Music</NavLink>
            <NavLink className={styles.link} activeClassName={styles.active} to='/news'>News</NavLink>
            <NavLink className={styles.link} activeClassName={styles.active} to='/settings'>Settings</NavLink>
            <NavLink className={styles.link} activeClassName={styles.active} to='/users'>Users</NavLink>
        </nav>
        )}

export default Navbar