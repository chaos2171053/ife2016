import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import styles from '../../../containers/MainLayout/MainLayout.scss'
const Navigation = () => (
    <div className={styles.nav}>
        <div className={styles.container}>
            <div className={styles.header}>
                <Link>
                    <span className={styles.home}>首页</span>
                </Link>
            </div>
            <div className={styles.collapse}>
                <ul className={styles['collapse-left']}>
                    <li className={styles.title}>问卷列表</li>
                </ul>
                <ul className={styles['collapse-right']}>
                    <li className={styles.title}>离开</li>
                </ul>
            </div>
        </div>
    </div>
)
export default Navigation