import React, { PropTypes } from 'react';
import styles from '../../containers/Fill/Fill.scss'
import QuestionTitle from './QuestionTitle'
import { RADIO, CHECKBOX, TEXT } from '../../constants/QuestionTypes'
import RadioQuestion from './RadioQuestion'
const Main = ({questions,handleRadio}) => {
    // console.log(questions)
    const renderQuestionType=(question,questionIndex) => {
        switch(question.type){
            case RADIO :{
                return (
                    <RadioQuestion
                        questionIndex = {questionIndex}
                        options = {question.options}
                        handleRadio = {handleRadio}
                    ></RadioQuestion>
                    )
            }
            break;
        }

    }
    return (
        <div>{
            questions.map((question,questionIndex)=>
            <div className = {styles['question-wrapper']} key = {questionIndex}>
                <QuestionTitle 
                    questionIndex = {questionIndex}
                    questionType = {question.type} 
                    questionTitle = {question.questionTitle}/>
                 <div className ={styles['options-wrapper']}>
                 {renderQuestionType(question,questionIndex)}
                 </div>
            </div>

            )
        }
        </div>
    )
}
Main.propTypes = {
    questions:PropTypes.array.isRequired,
    handleRadio:PropTypes.func.isRequired,
}
export default Main