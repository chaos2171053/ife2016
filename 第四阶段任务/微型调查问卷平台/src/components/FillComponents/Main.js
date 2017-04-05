import React, { PropTypes } from 'react';
import styles from '../../containers/Fill/Fill.scss'
import QuestionTitle from './QuestionTitle'
import { RADIO, CHECKBOX, TEXT } from '../../constants/QuestionTypes'
import RadioQuestion from './RadioQuestion'
import CheckBoxQuestion from './CheckBoxQuestion'
const Main = ({ questions, handleRadio,handleCheckBox }) => {
    const renderQuestionType = (question, questionIndex) => {
        switch (question.type) {
            case RADIO: {
                return (
                    <RadioQuestion
                        questionIndex={questionIndex}
                        options={question.options}
                        handleRadio={handleRadio}
                    />
                )
            }
                break;
            case CHECKBOX: {
                return (
                    <CheckBoxQuestion 
                        questionIndex = {questionIndex}
                        options = {question.options}
                        handleCheckBox = {handleCheckBox}
                        />
                        
                )
            }
            default:
                break;
        }

    }
    return (
        <div>{
            questions.map((question, questionIndex) =>
                <div className={styles['question-wrapper']} key={questionIndex}>
                    <QuestionTitle
                        questionIndex={questionIndex}
                        questionType={question.type}
                        questionTitle={question.questionTitle} />
                    <div className={styles['options-wrapper']}>
                        {renderQuestionType(question, questionIndex)}
                    </div>
                </div>

            )
        }
        </div>
    )
}
Main.propTypes = {
    questions: PropTypes.array.isRequired,
    handleRadio: PropTypes.func.isRequired,
    handleCheckBox: PropTypes.func.isRequired,
}
export default Main