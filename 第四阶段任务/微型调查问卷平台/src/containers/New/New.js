import React, { Component, PropTypes } from 'react';
import styles from './New.scss'
import { Link } from 'react-router-dom'
import { NewComponents, Input } from '../../components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RADIO, CHECKBOX, TEXT } from '../../constants/QuestionTypes'
import classNames from 'classnames'
import { trim, swapArrayItems, cloneObject } from '../../utils/util'
import * as Actions from '../../actions/questionnaires';
const { Header, Main, Footer, AddQuestion } = NewComponents

const mapStateToProps = state => ({
    username: state.rootReducer.status.username,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})
@connect(mapStateToProps, mapDispatchToProps)

class New extends Component {
    static propTypes = {
        username: React.PropTypes.string.isRequired,
        actions: React.PropTypes.shape({
            userSignup: PropTypes.func.isRequired,
            saveQuestionnaire: PropTypes.func.isRequired,
            publishQuestionnaire: PropTypes.func.isRequired,
        }),
        location:PropTypes.shape({
            questionnaire:PropTypes.object,
        }),
    }
    constructor(props) {
        super(props);
        this.state = {
            id: -1,
            questionnarireTitle: '',
            deadline: 0,
            status: '',
            questions: [],
            fillData:[],
        }
    }
    componentWillMount() {
        if(this.props.location.questionnaire){
            const {questionnaire}= this.props.location
            let cloneObj = cloneObject(questionnaire)
            this.state = {
                id: cloneObj.id,
                questionnarireTitle: cloneObj.questionnarireTitle,
                deadline: cloneObj.deadline,
                status: cloneObj.status,
                questions: cloneObj.questions,
                fillData:cloneObj.fillData,
            }

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
                        let cloneQuestion = cloneObject(q)
                        questions.splice(questionIndex + 1, 0, cloneQuestion);

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
                    isRequired: true,
                }
            ]

        })
    }

    //处理获取设置的问卷截止时间
    handleSetDeadLine(...args) {
        this.setState({ deadline: args[0].valueOf() })
    }

    //保存问卷
    handleSaveQuestionnaire() {
        const questionnaire = this.state;
        const { saveQuestionnaire } = this.props.actions;
        const username = this.props.username;
        saveQuestionnaire(questionnaire, username);

    }

    //发布问卷
    handlePublishQuestionnaire() {
        const questionnaire = this.state;
        const { publishQuestionnaire } = this.props.actions;
        const username = this.props.username;
        publishQuestionnaire(questionnaire, username)
    }

    //校验问卷
    validQuestionnaire() {
        const questionnaire = this.state;
        const questions = questionnaire.questions
        if (questionnaire.questionnarireTitle === null ||
            questionnaire.questionnarireTitle === undefined ||
            questionnaire.questionnarireTitle === '') {
            return {
                bollean: false,
                msg: '还没有写问卷标题啊！'
            }
        }
        if (questions.length === 0) {
            return {
                bollean: false,
                msg: '请至少设置一个问题~~'
            }
        }
        for (let i = 0, questionsLen = questions.length; i < questionsLen; i++) {
            let q = questions[i]
            if (q.type !== TEXT) {
                if (q.questionTitle === null ||
                    q.questionTitle === undefined ||
                    q.questionTitle === '') {
                    return {
                        bollean: false,
                        msg: `第${i + 1}题标题还没有写啊！`
                    }
                }
                if (q.options.length < 2) {
                    return {
                        bollean: false,
                        msg: `第${i + 1}题至少要有2个选项！`
                    }
                }
                for (let j = 0, optionLen = q.options.length; j < optionLen; j++) {
                    let o = q.options[j]
                    if (o === null ||
                        o === undefined ||
                        o === '') {
                        return {
                            bollean: false,
                            msg: `第${i + 1}题第${j + 1}个选项标题还没有写啊！`
                        }
                    }
                }
            } else {
                if (q.content === null || q.content === undefined || q.content === '') {
                    return {
                        bollean: false,
                        msg: `第${i + 1}题文本题还没有写题目啊`
                    }
                }
            }

        }
        // if (questionnaire.deadline === 0) {
        //     return {
        //         bollean: false,
        //         msg: '请设置问卷截止日期(￣～￣) 嚼!'
        //     }
        // }
        if(questionnaire.deadline <=Date.now()){
            return {
                bollean: false,
                msg: '截止日期不能早于现在!'
            }
        }
        return {
            boolean: true,
            deadline: questionnaire.deadline
        }

    }
   

    render() {
        // let qusetionsArray = this.renderQuestions();
        // console.log(this.state)
        // debugger
        return (
            <div>
                <Header
                    questionnarireTitle = {this.state.questionnarireTitle} 
                    handleEditText={::this.handleEditQuestionnaireTitle}/>
                <div className={styles.main}>
                    <hr className={styles.hr} />
                    {/*{this.renderQuestions()}*/}
                    <Main
                        questions={this.state.questions}
                        handleAddOption={::this.handleAddOption.bind(this)}
                        handleEditOption = {::this.handleEditOption.bind(this)}
                        handleRemoveOption = {::this.handleRemoveOption.bind(this)}
                        handleEditQuetion ={::this.handleEditQuetion.bind(this)}
                        handleEditTextQuestion = {::this.handleEditTextQuestion.bind(this)}
                        handleChangeQuestionIndex = {::this.handleChangeQuestionIndex.bind(this)}
                        handleToggleRequirement = {::this.handleToggleRequirement.bind(this)}/>
                    <AddQuestion addQuestion={::this.addQuestion}/>
                <hr className={styles.hr} />
                </div>
                <Footer
                    deadline = {this.state.deadline}
                    history={this.props.history}
                    validQuestionnaire={::this.validQuestionnaire}
                    handlePublishQuestionnaire={::this.handlePublishQuestionnaire}
                    handleSaveQuestionnaire= {::this.handleSaveQuestionnaire}
                    handleSetDeadLine={::this.handleSetDeadLine}/>
            </div>
        )
    }
}



export default New