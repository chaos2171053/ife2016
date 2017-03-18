import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styles from './Header.scss';
import QueueAnim from 'rc-queue-anim';

const config = { opacity: [1, 0] ,translateX:[0, 150]}
const Header = () => (
    <div>
        <QueueAnim  className="queue-anim-header" duration='1000' animConfig={config}>
            <div className={styles.header} key= 'header'>
                <h1 className={styles.home} key = 'home'>首页</h1>
                <Link to='/edit' key = 'link'>
                    <h1 >新建问卷</h1>
                </Link>
            </div>
        </QueueAnim>
    </div>
)
export default Header;