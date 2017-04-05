import React, { PropTypes } from 'react';
import styles from '../../containers/Fill/Fill.scss'
import QuestionTitle from './QuestionTitle'
import { RADIO, CHECKBOX, TEXT } from '../../constants/QuestionTypes'
import RadioQuestion from './RadioQuestion'
import CheckBoxQuestion from './CheckBoxQuestion'
import TextQuestion from './TextQuestion'

const Main = ({ questions, handleRadio, handleCheckBox,handleTextQuestion }) => {
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
                        questionIndex={questionIndex}
                        options={question.options}
                        handleCheckBox={handleCheckBox}
                    />

                )
            }
                break;
            case TEXT: {
                return (
                    <TextQuestion
                        handleTextQuestion = {handleTextQuestion}
                        questionIndex={questionIndex}
                        isRequired = {question.isRequired}
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
                        questionContent = {question.content}
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
    handleTextQuestion:PropTypes.func.isRequired
}
export default Main