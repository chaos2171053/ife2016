import React, { PropTypes } from 'react'
import styles from '../../../containers/Check/Check.scss'
import { RADIO, CHECKBOX, TEXT } from '../../../constants/QuestionTypes'
import PieChart from '../PieChart/PieChart'
const Main = ({ questions, fillData }) => {
    const renderQuestionType = (question, questionIndex) => {
        const { options } = question;
        switch (question.type) {
            case RADIO: {
                let dataPie = []
                options.map((option, optionIndex) => {
                    let count = 0;
                    fillData.map((data, dataIndex) => {
                        if (data[questionIndex][0] === optionIndex) {
                            count++;
                        }
                    })
                    dataPie.push({
                        value: count, name: option
                    })
                })
                return (
                    <div>
                        <PieChart
                            options={options}
                            dataPie={dataPie}
                            questionIndex={questionIndex}
                            questionTitle={question.questionTitle}
                            questionType={question.type} />
                    </div>
                )
            }
                break;
            case CHECKBOX: {

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