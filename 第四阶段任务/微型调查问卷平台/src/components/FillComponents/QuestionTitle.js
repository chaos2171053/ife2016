import React, { PropTypes } from 'react';
const QuestionTitle =({questionIndex,questionTitle,questionType})=>{
    return(
        <h2>{`Q${questionIndex + 1} (${questionType})${questionTitle}`}</h2>
    )
}
QuestionTitle.propTypes = {
    questionIndex:PropTypes.number.isRequired,
    questionType:PropTypes.string.isRequired,
    questionTitle:PropTypes.string.isRequired,
}
export default QuestionTitle