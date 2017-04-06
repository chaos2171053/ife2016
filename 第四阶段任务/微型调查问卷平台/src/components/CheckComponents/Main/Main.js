import React, { PropTypes } from 'react'
import styles from '../../../containers/Check/Check.scss'
import { RADIO, CHECKBOX, TEXT } from '../../../constants/QuestionTypes'
import PieChart from '../PieChart/PieChart'
const Main = ({ questions, fillData }) => {
    const renderQuestionType = (question, questionIndex) => {
        switch (question.type) {
            case RADIO: {
                const { options } = question;
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
                            dataPie={dataPie}
                            questionIndex={questionIndex}
                            questionTitle={question.questionTitle}
                            questionType={question.type} />
                    </div>
                )
            }
                break
            default:
                break;
        }
    }
    // debugger 
    return (
        <div>
            {
                questions.map((question, questionIndex) =>
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
    fillData: PropTypes.array.isRequired,
}
export default Main;