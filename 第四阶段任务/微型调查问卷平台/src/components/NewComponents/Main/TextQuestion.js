import React, { PropTypes } from 'react';
import styles from '../../../containers/New/New.scss';
import classNames from 'classnames'
const TextQuestion = ({ question,questionIndex,handleEditTextQuestion,handleToggleRequirement }) => (
    <div>
        <textarea
            value={question.content}
            className={styles.text}
            onChange={(event) =>handleEditTextQuestion(event, questionIndex)}
        />
        <div
            className={classNames({
                [styles.required]: !question.isRequired,
                [styles['not-required']]: question.isRequired
            })}
            onClick={() => handleToggleRequirement(questionIndex)}
        >
            <span>此题是否必填</span>
        </div>
    </div>
)
TextQuestion.propTypes = {
    question: PropTypes.object.isRequired,
    questionIndex:PropTypes.number.isRequired,
    handleEditTextQuestion:PropTypes.func.isRequired,
    handleToggleRequirement:PropTypes.func.isRequired,
}
export default TextQuestion

