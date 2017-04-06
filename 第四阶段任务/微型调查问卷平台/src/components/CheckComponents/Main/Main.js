import React, { PropTypes } from 'react';
import styles from '../../../containers/Check/Check.scss';
import { RADIO, CHECKBOX, TEXT } from '../../../constants/QuestionTypes';
import PieChart from '../PieChart/PieChart';
import BarChart from '../BarChart/BarChart';
const Main = ({ questions, fillData }) => {
    const renderQuestionType = (question, questionIndex) => {
        const { options } = question;
        switch (question.type) {
            case RADIO: {
                let pieData = []
                options.map((option, optionIndex) => {
                    let count = 0;
                    fillData.map((data, dataIndex) => {
                        if (data[questionIndex][0] === optionIndex) {
                            count++;
                        }
                    })
                    pieData.push({
                        value: count, name: option
                    })
                })
                return (
                    <div>
                        <PieChart
                            options={options}
                            pieData={pieData} />
                    </div>
                )
            }
                break;
            case CHECKBOX: {
                let barData = [];
                options.map((option,optionIndex)=>{
                    let count = 0;
                    fillData.map((data,dataIndex)=>{
                       data[questionIndex].map((choice,choiceIndex)=>{
                           if(data[questionIndex][choiceIndex] === optionIndex){
                               count ++;
                           }
                       })
                    })
                    barData.push(count);
                })
                return(
                    <div>
                    <BarChart
                        options = {options}
                        barData = {barData}
                        />
                    </div>
                )
            }
                break;
            default:
                break;
        }
    }
    return (
        <div>
            {
                questions.map((question, questionIndex) =>
                    <div className={styles['question-wrapper']} key={questionIndex}>
                        <div className={styles['question-title']}>
                            <div className={styles['title-wrapper']}>
                                {
                                    question.type !== TEXT? 
                                    (<h2>{`Q${questionIndex + 1}  ${question.questionTitle}`}</h2>):
                                    (<h2>{`Q${questionIndex + 1}  ${question.content}`}</h2>)
                                }
                                
                            </div>
                            <h3>{question.type}</h3>
                        </div>
                        {renderQuestionType(question, questionIndex)}
                    </div>
                )
            }
        </div>
    )
}
Main.propTypes = {
    questions: PropTypes.array.isRequired,
    fillData: PropTypes.array.isRequired,
}
export default Main;