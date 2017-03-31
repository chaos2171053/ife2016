import React from 'react'
import moment from 'moment';
import 'moment/locale/zh-cn';
import { DatePicker } from 'antd';
import styles from './Footer.scss'
// import classNames from 'classnames'

moment.locale('zh-cn');
const disabledDate = function(current) {
  return current && current.valueOf() < Date.now();
}
const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles['datePicker-wrapper']}>
                <span className = {styles.deadline}>问卷截止日期:</span>
                <DatePicker
                    disabledDate={disabledDate}
                    />
            </div>
                <button>保存问卷</button>
                <button>发布问卷</button>
                <button>返回</button>
        </div>
    )
}
export default Footer