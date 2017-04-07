import React, { Component, PropTypes } from 'react';
import styles from './Fill.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FillComponents } from '../../components'
import { trim } from '../../utils/util'
import { Link} from 'react-router-dom'
import { message } from 'antd';
import * as Actions from '../../actions/questionnaires';
import {TEXT } from '../../constants/QuestionTypes'
const { Main } = FillComponents

const mapStateToProps = state => ({
    username: state.rootReducer.status.username,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Fill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // fillData: []//存放填写的问卷数据
        }
    }
    static propTypes = {
        location: React.PropTypes.shape({
            questionnaire: PropTypes.object.isRequired,
        }),

    }

    componentWillMount() {
        const { questionnaire: { questions } } = this.props.location;
        let fillData = new Array(questions.length)
        fillData.fill(['']);
        this.setState({
            fillData: fillData
        })
    }

    //处理单选题
    handleRadio(questionIndex, optionIndex) {
        let fillData = this.state.fillData;
        fillData[questionIndex] = [optionIndex]; // 把选择的选项索引放入数组中
        this.setState({
            fillData: fillData
        })
        // console.log(this.state.fillData)
    }

    //处理多选题
    handleCheckBox(questionIndex, optionIndexArray) {
        let fillData = this.state.fillData;
        fillData[questionIndex] = optionIndexArray;
        this.setState({
            fillData: fillData
        })
        // console.log(this.state.fillData)
    }

    //处理文本题
    handleTextQuestion(event, questionIndex) {
        let fillData = this.state.fillData;
        fillData[questionIndex] = [trim(event.target.value)];
        this.setState({
            fillData: fillData
        })
    }

    //处理提交问卷
    handleSubmitQuestionnnaire(username, id) {
        const fillData = this.state.fillData;
        const { submitQuestionnaire } = this.props.actions;
        const history = this.props.history;
        const { questionnaire: { questions } } = this.props.location;
        const result = fillData.some((question, index) => {
            if (questions[index].type !== TEXT) {
                return question.some(value => value === '')
            } else {
                if (questions[index].isRequired === true) {
                    return question.some(value => value === '')
                } else {
                    return false;
                }
            }

        })
        if (result) {
            message.error('请把问卷填写完整！');
        } else {
            submitQuestionnaire(username, id, fillData);
            history.push('/home');
            message.success('提交成功O(∩_∩)O');
        }
    }
    render() {
        const { questionnaire } = this.props.location;
        const { questions, id } = questionnaire;
        const username = this.props.username
        // console.log(this.state.fillData)
        return (
            <div className={styles.main}>
                <div className={styles.header}>
                    <h1>{questionnaire.questionnarireTitle}</h1>
                </div>
                <hr className={styles.hr} />
                <div className={styles['questions-wrapper']}>
                    <Main
                        questions={questions}
                        handleRadio={::this.handleRadio}
                        handleCheckBox ={::this.handleCheckBox}
                        handleTextQuestion = {::this.handleTextQuestion}
                />
                </div>
                <hr className={styles.hr} />
                <div className={styles['footer-wrapper']}>
                    <button onClick={() => this.handleSubmitQuestionnnaire(username, id)}>提交问卷</button>
                    <Link to='/home' className={styles.link}>
                        <button>返回</button>
                    </Link>
                </div>
            </div >
        )
    }
}