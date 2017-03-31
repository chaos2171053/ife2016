import React, { PropTypes } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { DatePicker } from 'antd';
import styles from './Footer.scss'
import { Link } from 'react-router-dom'
moment.locale('zh-cn');
const disabledDate = function (current) {
    if (current !== undefined) {
        return current.valueOf() + 86400000 < Date.now();
    }
}
const Footer = ({ handleSetDeadLine, handleSaveQuestionnaire }) => {
    return (
        <div className={styles.footer}>
            <div className={styles['datePicker-wrapper']}>
                <span className={styles.deadline}>问卷截止日期:</span>
                <DatePicker
                    allowClear={false}
                    onChange={handleSetDeadLine}
                    disabledDate={disabledDate}
                />
            </div>
            <Link to='/home' className={styles.link}>
                <button onClick={handleSaveQuestionnaire}>保存问卷</button>
            </Link>
            <button>发布问卷</button>
            <Link to='/home' className={styles.link}>
                <button>返回</button>
            </Link>
        </div>
    )
}
Footer.propTypes = {
    handleSetDeadLine: React.PropTypes.func.isRequired,
    handleSaveQuestionnaire: React.PropTypes.func.isRequired,
}
export default Footer