import React, { PropTypes } from 'react';
import styles from '../../../containers/New/New.scss';
import { RADIO, CHECKBOX, TEXT } from '../../../constants/QuestionTypes'
import { Input } from '../../'
import classNames from 'classnames'
const MultipleQuestion = ({question,questionIndex,handleEditOption,handleRemoveOption,handleAddOption}) => (
    <div>
        {question.options.map((option, optionIndex) => {
            return (
                <div className={styles['options-wrapper']} key={optionIndex}>
                    <span className={classNames({
                        [styles['radio-option-icon']]: question.type === RADIO,
                        [styles['checkbox-option-icon']]: question.type === CHECKBOX
                    })} />
                    <Input
                        value={question.options[optionIndex]}
                        placeholder={`选项${optionIndex + 1}`}
                        handleEditText={(event) =>handleEditOption(event, questionIndex, optionIndex)}
                    />
                    <span
                        className={styles['remove-option-btn']}
                        onClick={() => { handleRemoveOption(questionIndex, optionIndex) }}
                    />
                </div>
            )
        })}
        <div className={styles['add-option-btn']}
            onClick={() => { handleAddOption(questionIndex) }} />
    </div>
)
MultipleQuestion.propTypes = {
    question:PropTypes.object.isRequired,
    questionIndex:PropTypes.number.isRequired,
    handleEditOption:PropTypes.func.isRequired,
    handleRemoveOption:PropTypes.func.isRequired,
    handleAddOption:PropTypes.func.isRequired,
}
export default MultipleQuestion