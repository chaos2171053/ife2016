import React from 'react'
import moment from 'moment';
import { DatePicker } from 'antd';
import styles from './Footer.scss'
import classNames from 'classnames'
moment.locale('zh-cn');


const Footer = () => {
    // const datePickerStyle ={width: '7.5rem',}
    // return (
    //     <div className = {classNames({
    //         [styles['footer']]:true,
    //         [styles['clearfix']]:true
    //     })}>
    //         <DatePicker/>
    //         <button>返回</button>
    //         <button>发布问卷</button>
    //         <button>保存问卷</button>
    //     </div>
    // )
    return (
        <div className={styles.footer}>
            <div className={styles['datePicker-wrapper']}>
                <span className = {styles.deadline}>问卷截止日期:</span>
                <DatePicker defaultValue={moment('2017-05-01', 'YYYY-MM-DD')} />
            </div>
                <button>保存问卷</button>
                <button>发布问卷</button>
                <button>返回</button>
        </div>
    )
}
export default Footer