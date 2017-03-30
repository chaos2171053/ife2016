import React, { Component, PropTypes } from 'react';
import styles from './New.scss'
import { Link } from 'react-router-dom'
import { NewComponents, Input } from '../../components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RADIO, CHECKBOX, TEXT } from '../../constants/QuestionType'
import classNames from 'classnames'
import { trim } from '../../utils/util'
// import * as Actions from '../../actions/addQuestionnaire';

const { Header, Main, Footer, AddQuestion } = NewComponents

// const mapStateToProps = state => ({
//     // username：state.rootReducer.status.
//     addQuestionnaire: state.rootReducer.addQuestionnaire
// })
const mapStateToProps = state => {
    return {
        username: state.rootReducer.status.username,
    }
}
// const mapDispatchToProps = dispatch => ({
//     actions: bindActionCreators(Actions, dispatch)
// })
@connect(mapStateToProps)

class New extends Component {
    static propTypes = {
        username: React.PropTypes.string.isRequired,

    }
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            questionnarireTitle: '',
            deadline: '',
            status: '',
            questions: []
        }
    }

    //编辑问卷标题
    handleEditQuestionnaireTitle(event) {
        this.setState({ questionnarireTitle: trim(event.target.value), })
    }

    //修改问题标题
    handleEditQuetion(event, questionIndex) {
        let questions = this.state.questions
        questions.forEach((q, index) => {
            if (questionIndex === index) {
                q.questionTitle = trim(event.target.value)
            }
        })
        this.setState({
            questions: questions
        })
    }

    //修改选项内容
    handleEditOption(event, questionIndex, optionIndex) {
        let questions = this.state.questions
        questions.forEach((q, index) => {
            if (questionIndex === index) {
                questions[questionIndex].options.forEach((o, i) => {
                    if (optionIndex === i) {
                        questions[questionIndex].options[optionIndex] = trim(event.target.value)
                    }
                })
            }
        })
        this.setState({
            questions: questions
        })
    }

    handleRemoveOption(questionIndex, optionIndex) {
        let questions = this.state.questions
        questions.forEach((q, index) => {
            if (questionIndex === index) {
                questions[questionIndex].options.forEach((o, i) => {
                    if (optionIndex === i) {
                        questions[questionIndex].options.splice(optionIndex, 1);
                    }
                })
            }
        })
        this.setState({
            questions: questions
        })
        // console.log(this.state)
    }

    //添加问题 单选/多选/文本.单选,多选预设两个选项
    addQuestion(QUESTION_TYPE) {
        let option
        switch (QUESTION_TYPE) {
            case RADIO:
                option = ['', ''];
                break
            case CHECKBOX:
                option = ['', '', '', ''];
                break;
            case TEXT:
                break;
        }
        //设置预设选项
        this.setState({
            questions: [
                ...this.state.questions,
                {
                    type: QUESTION_TYPE,
                    questionTitle: '', // 问题标题
                    options: option, // 问题选项
                }
            ]

        })
    }
    renderQuestions() { //渲染题目
        let qusetionsArray = [];
        const { questions } = this.state;
        if (questions.length === 0) {
            return null;
        }
        
        return (
            questions.map((question, questionIndex) =>
                <div className={styles['question-wrapper']} key={questionIndex}>
                    <div className={styles['question-title-wrapper']}>
                        <span>{`Q${questionIndex + 1} (${question.type})`}</span>
                        <Input
                            value = {question.questionTitle}
                            placeholder={`请填写标题`}
                            handleEditText={(event) => this.handleEditQuetion(event, questionIndex)} />
                    </div>
                    <div>
                        {question.type !== TEXT ? (
                            <div>
                                {question.options.map((option, optionIndex) => {
                                    return (
                                        <div className={styles['option-wrapper']} key={optionIndex}>
                                            <span className={classNames({
                                                [styles["radio-option-icon"]]: question.type === RADIO,
                                                [styles["checkbox-option-icon"]]: question.type === CHECKBOX
                                            })} />
                                            <Input
                                                value={question.options[optionIndex]}
                                                placeholder={`选项${optionIndex + 1}`}
                                                handleEditText={(event) => this.handleEditOption(event, questionIndex, optionIndex)}
                                            />
                                            <span
                                                className={styles["remove-option-btn"]}
                                                onClick={() => { this.handleRemoveOption(questionIndex, optionIndex) }}
                                            />
                                            <div className={styles["add-option-btn"]} />
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (<span />)}
                    </div>
                </div>
            )
        )
    }

    render() {
        const { username } = this.props.username;
        let qusetionsArray = this.renderQuestions();
        return (
            <div>
                <Header handleEditText={::this.handleEditQuestionnaireTitle}/>
                <div className={styles.main}>
                    <hr className={styles.hr} />
                    {this.renderQuestions()}
                    <AddQuestion addQuestion={::this.addQuestion}/>
                <hr className={styles.hr} />
                </div>
                <Footer />
            </div>
        )
    }
}



export default New