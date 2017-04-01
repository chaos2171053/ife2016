import React, { PropTypes } from 'react';
import styles from '../../../containers/New/New.scss';

const OperateQuestion = ({questionIndex,handleChangeQuestionIndex,last}) => (
    <div className={styles['operation-wraper']}>
        {
            questionIndex > 0 && (
                <div
                    className={styles.operation}
                    onClick={() => handleChangeQuestionIndex(questionIndex, '上移')}>
                    <span>上移</span>
                </div>
            )
        }
        {
            questionIndex < last && (
                <div
                    className={styles.operation}
                    onClick={() => handleChangeQuestionIndex(questionIndex, '下移')}
                >
                    <span>下移</span>
                </div>
            )
        }
        <div
            className={styles.operation}
            onClick={() => handleChangeQuestionIndex(questionIndex, '删除')}>
            <span>删除</span>
        </div>
        <div
            className={styles.operation}
            onClick={() => handleChangeQuestionIndex(questionIndex, '复用')}>
            <span>复用</span>
        </div>
    </div>
)

OperateQuestion.propTypes = {
    questionIndex:PropTypes.number.isRequired,
    handleChangeQuestionIndex:PropTypes.func.isRequired,
    last:PropTypes.number.isRequired,
}

export default OperateQuestion