import React from 'react'
import styles from '../../../containers/New/New.scss'
import AddQuestion from './AddQuestion'
const Main = () => {
    return (
        <div className={styles.main}>
            <hr className={styles.hr}/>
            问题列表
            <AddQuestion/>
            <hr className={styles.hr}/>
        </div>
    )
}
export default Main