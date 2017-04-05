import React, { PropTypes } from 'react';
import styles from '../../containers/Fill/Fill.scss'
import classNames from 'classnames'
const TextQuestion = ({questionIndex, isRequired,handleTextQuestion}) => {
    return (
        <div>
            <textarea onChange = {(event)=>{handleTextQuestion(event,questionIndex)}}/>
            <div>
                <span
                    className={classNames({ [styles['is-required']]: isRequired })}>
                    {isRequired ? "*此题为必填" : "此题为选填"}
                </span>
            </div>
        </div>
    )
}
TextQuestion.proTypes = {
    questionIndex: PropTypes.number.isRequired,
    isRequired: PropTypes.bool.isRequired,
    handleTextQuestion:PropTypes.func.isRequired
}
export default TextQuestion