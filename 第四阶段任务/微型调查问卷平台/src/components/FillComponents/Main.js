import React, { PropTypes } from 'react';
import styles from '../../containers/Fill/Fill.scss'
import QuestionTitle from './QuestionTitle'
import { RADIO, CHECKBOX, TEXT } from '../../constants/QuestionTypes'
import RadioQuestion from './RadioQuestion'
const Main = ({questions}) => {
    // console.log(questions)
    const renderQuestionType=(question) => {
        switch(question.type){
            case RADIO :{
                return (
                    <RadioQuestion
                        options = {question.options}
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
                 {renderQuestionType(question)}
                 </div>
            </div>

            )
        }
        </div>
    )
}
Main.propTypes = {
    questions:PropTypes.array.isRequired,
}
export default Main