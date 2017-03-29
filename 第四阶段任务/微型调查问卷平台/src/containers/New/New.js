import React, { Component, PropTypes } from 'react';
import styles from './New.scss'
import { Link } from 'react-router-dom'
import { NewComponents } from '../../components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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

    }
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            questionnarireTitle: ' ',
            deadline: '',
            status: '',
            questions: []
        }
    }
    addRadioQuestion(QUESTION_TYPE) {
        this.setState({
            questions: [
                ...this.state.questions,
                {
                    type: QUESTION_TYPE,
                    questionTitle: '', // 问题标题
                    options: [], // 问题选项
                }
            ]

        })
    }
    renderQuestions() { //渲染题目
        let qusetionsArray = [];
        const { questions } = this.state;
        if(questions.length === 0){
            return null;
        }

        return(
            questions.map((question,questionIndex) => 
                <div className = {styles['question-wrapper']} key = {questionIndex}>
                    <div className ={styles['question-title-wrapper']}>
                        <span>{`Q${questionIndex + 1}`}</span>
                        <input/>
                        {question.type !== 'TEXT'?(
                            <div>
                                <div>
                                    <span className ={styles['123']}>图标</span>
                                    <input/>
                                    <span>删除</span>
                                </div>
                            </div>
                        ):(<span/>)}
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
                <Header />
                {this.renderQuestions()}
                <AddQuestion addRadioQuestion={::this.addRadioQuestion}/>
                <Footer />
            </div>
        )
    }
}



export default New