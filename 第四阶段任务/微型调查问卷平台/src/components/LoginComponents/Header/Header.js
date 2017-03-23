import React from 'react';
import styles from '../../../containers/Login/Login.scss'
const Header = () => (
    <div className = {styles.wrapper}>
    <div className={styles.header}>
        <div className={styles['logo-wrapper']}><h1 className={styles.logo}>问吧</h1></div>
        <h2 className={styles.subtitle}>与世界分享你瞎编的问卷</h2>
    </div>
    </div>
)
export default Header