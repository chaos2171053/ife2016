import React,{PropTypes} from 'react'
import styles from '../../../containers/Check/Check.scss'
import { RADIO, CHECKBOX, TEXT } from '../../../constants/QuestionTypes'
const Main =({questions,fillData})=>{
    const renderQuestionType =(question, questionIndex) =>{
        switch(question.type){
            case RADIO:{
                return(
                    <div>5555</div>
                )
            }
            break
            default:
            break;
        }
    }
    // debugger 
    return(
        <div>
        {
            questions.map((question,questionIndex)=>
                <div className={styles['question-wrapper']} key={questionIndex}>
                {renderQuestionType(question, questionIndex)}
                </div>
            )
        }
        </div>
    )
}
Main.propTypes = {
    questions: PropTypes.array.isRequired,
    fillData:PropTypes.array.isRequired,
}
export default Main;