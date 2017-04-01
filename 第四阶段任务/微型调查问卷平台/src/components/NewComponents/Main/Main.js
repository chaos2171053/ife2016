import React, { PropTypes } from 'react';
import styles from '../../../containers/New/New.scss';
import { RADIO, CHECKBOX, TEXT } from '../../../constants/QuestionTypes'
import classNames from 'classnames'
import QuestionTitle from './QuestionTitle'
import TextQuestion from './TextQuestion'
import MultipleQuestion from './MultipleQuestion'
const Main = ({ questions, handleEditQuetion,handleEditTextQuestion,
    handleToggleRequirement,handleEditOption,handleRemoveOption,handleAddOption }) => {
    const last = questions.length - 1;
    return (
        <div>
            {questions.map((question, questionIndex) =>
                <div className={styles['question-wrapper']} key={questionIndex}>
                    <QuestionTitle 
                        question = {question} 
                        handleEditQuetion = {handleEditQuetion}
                        questionIndex = {questionIndex}/>
                    <div>
                    {
                        question.type !== TEXT?
                        (<MultipleQuestion
                            question= {question}
                            handleAddOption = {handleAddOption}
                            handleRemoveOption = {handleRemoveOption}
                            handleEditOption = {handleEditOption}
                            questionIndex = {questionIndex}/>):
                        (<TextQuestion
                            question = {question}
                            questionIndex = {questionIndex}
                            handleToggleRequirement = {handleToggleRequirement}
                            handleEditTextQuestion = {handleEditTextQuestion}/>)
                    }
                    </div>
                </div>
            )}
        </div>
    )
}
Main.propTypes = {
    questions: PropTypes.array.isRequired,
    handleEditQuetion:PropTypes.func.isRequired,
    handleEditTextQuestion:PropTypes.func.isRequired,
    handleToggleRequirement:PropTypes.func.isRequired,
    handleEditOption:PropTypes.func.isRequired,
    handleRemoveOption:PropTypes.func.isRequired,
    handleAddOption:PropTypes.func.isRequired
}
export default Main