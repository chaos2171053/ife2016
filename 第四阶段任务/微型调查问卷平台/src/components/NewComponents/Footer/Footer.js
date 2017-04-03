import React, { PropTypes } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Modal, DatePicker,message } from 'antd';
import styles from './Footer.scss'
import { Link, withRouter } from 'react-router-dom'

moment.locale('zh-cn');
const disabledDate = function (current) {
    // if (current !== undefined) {
    //     return current.valueOf() + 86400000 < Date.now();
    // }
    return  current  <= (new Date()).getTime()-1000*60*60*24;
}
const Footer = withRouter(({ handleSetDeadLine, 
    handleSaveQuestionnaire, history, handlePublishQuestionnaire,validQuestionnaire }) => {
    const handleSaveQuestionnaireModal = () => {
        Modal.confirm({
            title: '提示',
            content: '是否保存问卷？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                handleSaveQuestionnaire();
                message.success('保存成功');
                history.push('/home')
            },
            onCancel() { },
        });
    }
    const handlePublishQuestionnaireModal = () => {
        const result = validQuestionnaire()
        if (result.boolean === true) {
            const time = new Date(result.deadline);
            const [year, month, date] = [time.getFullYear(), time.getMonth() + 1, time.getDate()];
            Modal.confirm({
                title: '提示',
                content: <div><p>是否发布问卷?</p> <p>{`(本问卷截止日期为${year}-${month}-${date})`}</p></div>,
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    handlePublishQuestionnaire();
                    message.success('发布成功');
                    history.push('/home')
                },
                onCancel() { },
            });
        } else {
            Modal.error({
                title: '啊喂！出错啦！',
                content: result.msg,
                onOk(){},
                onCancel() { },
            });
        }

    }
    return (
        <div className={styles.footer}>
            <div className={styles['datePicker-wrapper']}>
                <span className={styles.deadline}>问卷截止日期:</span>
                <DatePicker
                    showTime
                    format='YYYY-MM-DD HH:mm:ss'
                    allowClear={false}
                    
                    onChange={handleSetDeadLine}
                    disabledDate={disabledDate}
                />
            </div>
            <button onClick={handleSaveQuestionnaireModal}>保存问卷</button>
            <button onClick={handlePublishQuestionnaireModal}>发布问卷</button>
            <Link to='/home' className={styles.link}>
                <button>返回</button>
            </Link>
        </div>
    )
})
Footer.propTypes = {
    history: React.PropTypes.object.isRequired,
    validQuestionnaire: React.PropTypes.func.isRequired,
    handlePublishQuestionnaire: React.PropTypes.func.isRequired,
    handleSetDeadLine: React.PropTypes.func.isRequired,
    handleSaveQuestionnaire: React.PropTypes.func.isRequired,
}
export default Footer