import React, { Component, PropTypes } from 'react';
import styles from './New.scss'
import { Link } from 'react-router-dom'
import { NewComponents, Input } from '../../components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RADIO, CHECKBOX, TEXT } from '../../constants/QuestionType'
import classNames from 'classnames'
import { trim, swapArrayItems,cloneObject } from '../../utils/util'
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
            deadline: 0,
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

    //修改文本题内容
    handleEditTextQuestion(event, questionIndex) {
        let questions = this.state.questions
        questions.forEach((q, index) => {
            if (questionIndex === index) {
                questions[questionIndex].content = trim(event.target.value);
            }
        })
        this.setState({
            questions: questions
        })
    }

    //修改文本题是否必填
    handleToggleRequirement(questionIndex) {
        let questions = this.state.questions
        questions.forEach((q, index) => {
            if (questionIndex === index) {
                questions[questionIndex].isRequired = !questions[questionIndex].isRequired;
            }
        })
        this.setState({
            questions: questions
        })
    }

    //添加选项
    handleAddOption(questionIndex) {
        let questions = this.state.questions
        questions.forEach((q, index) => {
            if (questionIndex === index) {
                questions[questionIndex].options.push('');
            }
        })
        this.setState({
            questions: questions
        })
    }
    //删除选项
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

    //对问题进行上移、下移、删除、复用操作
    handleChangeQuestionIndex(questionIndex, operation) {
        let questions = this.state.questions
        switch (operation) {
            case '上移': { this.setState({ questions: swapArrayItems(questions, questionIndex, questionIndex - 1) }) }
                break;
            case '下移': { this.setState({ questions: swapArrayItems(questions, questionIndex, questionIndex + 1) }) }
                break;
            case '删除': {
                questions.splice(questionIndex, 1);
                this.setState({ questions: questions })
            }
                break;
            case '复用': {
                questions.forEach((q, index) => {
                    if (questionIndex === index) {
                        let cloneQuestion =cloneObject(q)
                        questions.splice(questionIndex+1,0,cloneQuestion);

                    }
                })
                this.setState({ questions: questions })
            }
                break;
        }


    }

    //添加问题 单选/多选/文本.单选,多选预设两个选项
    addQuestion(QUESTION_TYPE) {
        let option, content;
        switch (QUESTION_TYPE) {
            case RADIO:
                option = ['', ''];
                break
            case CHECKBOX:
                option = ['', '', '', ''];
                break;
            case TEXT:
                content = ''
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
                    content: content,
                    isRequired: false,
                }
            ]

        })
    }

    //处理获取设置的问卷截止时间
    handleSetDeadLine(...args) {
        // const timestamp = args[0].valueOf()
        this.setState({deadline:args[0].valueOf() })
    }
    renderQuestions() { //渲染题目
        let qusetionsArray = [];
        const { questions } = this.state;
        let last = questions.length - 1
        return (
            questions.map((question, questionIndex) =>
                <div className={styles['question-wrapper']} key={questionIndex}>
                    <div className={styles['question-title-wrapper']}>
                        <span>{`Q${questionIndex + 1} (${question.type})`}</span>
                        <Input
                            value={question.questionTitle}
                            placeholder={`请填写标题`}
                            handleEditText={(event) => this.handleEditQuetion(event, questionIndex)} />
                    </div>
                    <div>
                        {question.type !== TEXT ? (
                            <div>
                                {question.options.map((option, optionIndex) => {
                                    return (
                                        <div className={styles['options-wrapper']} key={optionIndex}>
                                            <span className={classNames({
                                                [styles['radio-option-icon']]: question.type === RADIO,
                                                [styles['checkbox-option-icon']]: question.type === CHECKBOX
                                            })} />
                                            <Input
                                                value={question.options[optionIndex]}
                                                placeholder={`选项${optionIndex + 1}`}
                                                handleEditText={(event) => this.handleEditOption(event, questionIndex, optionIndex)}
                                            />
                                            <span
                                                className={styles['remove-option-btn']}
                                                onClick={() => { this.handleRemoveOption(questionIndex, optionIndex) }}
                                            />
                                        </div>
                                    )
                                })}
                                <div className={styles['add-option-btn']}
                                    onClick={() => { this.handleAddOption(questionIndex) }} />
                            </div>
                        ) : (
                                <div>
                                    <textarea
                                        value={question.content}
                                        className={styles.text}
                                        onChange={(event) => this.handleEditTextQuestion(event, questionIndex)}
                                    />
                                    <div
                                        className={classNames({
                                            [styles.required]: !question.isRequired,
                                            [styles['not-required']]: question.isRequired
                                        })}
                                        onClick={() => this.handleToggleRequirement(questionIndex)}
                                    >
                                        <span>此题是否必填</span>
                                    </div>
                                </div>)}
                        <div className={styles['operation-wraper']}>
                            {
                                questionIndex > 0 && (
                                    <div
                                        className={styles.operation}
                                        onClick={() => this.handleChangeQuestionIndex(questionIndex, '上移')}>
                                        <span>上移</span>
                                    </div>
                                )
                            }
                            {
                                questionIndex < last && (
                                    <div
                                        className={styles.operation}
                                        onClick={() => this.handleChangeQuestionIndex(questionIndex, '下移')}
                                    >
                                        <span>下移</span>
                                    </div>
                                )
                            }
                                <div
                                    className={styles.operation}
                                    onClick={() => this.handleChangeQuestionIndex(questionIndex, '删除')}>
                                    <span>删除</span>
                                </div>
                                <div
                                    className={styles.operation}
                                    onClick={() => this.handleChangeQuestionIndex(questionIndex, '复用')}>
                                    <span>复用</span>
                                </div>
                        </div>
                    </div>
                </div>
            )
        )
    }

    render() {
        const { username } = this.props.username;
        let qusetionsArray = this.renderQuestions();
        console.log(this.state)
        return (
            <div>
                <Header handleEditText={::this.handleEditQuestionnaireTitle}/>
                <div className={styles.main}>
                    <hr className={styles.hr} />
                    {this.renderQuestions()}
                    <AddQuestion addQuestion={::this.addQuestion}/>
                <hr className={styles.hr} />
                </div>
                <Footer handleSetDeadLine = {::this.handleSetDeadLine}/>
            </div>
        )
    }
}



export default New