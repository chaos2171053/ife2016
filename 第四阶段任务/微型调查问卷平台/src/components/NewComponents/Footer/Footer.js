import React, { PropTypes } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Modal, DatePicker } from 'antd';
import styles from './Footer.scss'
import { Link, withRouter } from 'react-router-dom'
moment.locale('zh-cn');
const disabledDate = function (current) {
    if (current !== undefined) {
        return current.valueOf() + 86400000 < Date.now();
    }
}
const Footer = withRouter(({ handleSetDeadLine, handleSaveQuestionnaire ,history}) => {
    const handleSaveQuestionnaireModal = () => {
        Modal.confirm({
            title: '提示',
            content: '确定要保存问卷吗？',
            okText: '确定',
            cancelText: '取消',
            onOk(){
                handleSaveQuestionnaire();
                history.push('/home')
            },
            onCancel() {},
        });
    }
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
                <button onClick={handleSaveQuestionnaireModal}>保存问卷</button>
            <button>发布问卷</button>
            <Link to='/home' className={styles.link}>
                <button>返回</button>
            </Link>
        </div>
    )
})
Footer.propTypes = {
    handleSetDeadLine: React.PropTypes.func.isRequired,
    handleSaveQuestionnaire: React.PropTypes.func.isRequired,
}
export default Footer