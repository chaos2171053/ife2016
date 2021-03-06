import React, { PropTypes } from 'react';
import styles from '../../../containers/New/New.scss';
import { Input } from '../../'
import { TEXT } from '../../../constants/QuestionTypes'
const QuestionTitle = ({ question, questionIndex, handleEditQuetion }) => (
    <div className={styles['question-title-wrapper']}>
        <span>{`Q${questionIndex + 1} (${question.type})`}</span>
        {question.type == TEXT ? (null) :
            (<Input
                value={question.questionTitle}
                placeholder={`请填写标题`}
                handleEditText={(event) => handleEditQuetion(event, questionIndex)} />)}

    </div>
)
QuestionTitle.propTypes = {
    question: PropTypes.object.isRequired,
    questionIndex: PropTypes.number.isRequired,
    handleEditQuetion: PropTypes.func.isRequired,
}
export default QuestionTitle
