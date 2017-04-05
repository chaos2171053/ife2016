import React, { PropTypes } from 'react';
import { TEXT } from '../../constants/QuestionTypes'
const QuestionTitle =({questionIndex,questionTitle,questionType,questionContent})=>{
    const title = questionType === TEXT ? questionContent:questionTitle
    return(
        <h2>{`Q${questionIndex + 1} (${questionType})${title}`}</h2>
    )
}
QuestionTitle.propTypes = {
    questionIndex:PropTypes.number.isRequired,
    questionType:PropTypes.string.isRequired,
    questionTitle:PropTypes.string.isRequired,
    questionContent:PropTypes.string,
}
export default QuestionTitle