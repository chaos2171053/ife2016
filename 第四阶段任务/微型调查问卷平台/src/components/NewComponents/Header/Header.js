import React from 'react'
import styles from '../../../containers/New/New.scss'
const Header = () => {
    return (
        <div className={styles['header-wrapper']}>
            <input className={styles.header} placeholder='请填写标题'></input>
        </div>
    )
}
export default Header