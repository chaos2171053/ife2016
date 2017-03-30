import React, { Component, PropTypes } from 'react';
import styles from './New.scss'
import { Link } from 'react-router-dom'
import { NewComponents } from '../../components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {RADIO,CHECKBOX,TEXT} from '../../constants/QuestionType'
import classNames from 'classnames'
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
    addQuestion(QUESTION_TYPE) { //添加问题
        let option
        switch(QUESTION_TYPE){
            case RADIO:
            case CHECKBOX:
            option = ['选项1','选项2'];
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
                    options: option,//[], // 问题选项
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
                        <input className = {styles['bkcolor']} placeholder={`(${question.type}) 请输入标题`}/>
                    </div>
                    <div>
                        {question.type !== TEXT?(
                            <div>
                            {question.options.map((option,optionIndex)=>{
                                return(     
                                <div className = {styles['option-wrapper']} key = {optionIndex}>
                                <span className={classNames({
                                        [styles["radio-option-icon"]]: question.type === RADIO,
                                        [styles["checkbox-option-icon"]]: question.type === CHECKBOX
                                    })} />
                                <input placeholder={`(选项${optionIndex+1}) 请输入内容`}/>
                                <span
                                    className={styles["remove-option-btn"]}
                                />
                                <div className={styles["add-option-btn"]}/>
                                </div>
                            )})}
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
                <Header/>
                <div className ={styles.main}>
                <hr className = {styles.hr}/>
                {this.renderQuestions()}
                <AddQuestion addQuestion={::this.addQuestion}/>
                <hr className = {styles.hr}/>
                </div>
                <Footer />
            </div>
        )
    }
}



export default New