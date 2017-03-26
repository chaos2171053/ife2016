import React from 'react'
import moment from 'moment';
import { DatePicker } from 'antd';
import styles from './Footer.scss'
import classNames from 'classnames'
moment.locale('zh-cn');


const Footer = () => {
    return (
        <div className = {classNames({
            [styles['footer']]:true,
            [styles['clearfix']]:true
        })}>
            <DatePicker/>
            <button>返回</button>
            <button>发布问卷</button>
            <button>保存问卷</button>
        </div>
    )
}
export default Footer