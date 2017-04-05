import React, { PropTypes } from 'react';
import styles from './Main.scss'
import QuestionTitle from './QuestionTitle'
const Main = ({questions}) => {
    console.log(questions)
    return (
        <div>{
            questions.map((question,questionIndex)=>
                <QuestionTitle 
                    key = {questionIndex}
                    questionIndex = {questionIndex}
                    questionType = {question.type} 
                    questionTitle = {question.questionTitle}/>
            )
        }
        </div>
    )
}
Main.propTypes = {
    questions:PropTypes.array.isRequired,
}
export default Main