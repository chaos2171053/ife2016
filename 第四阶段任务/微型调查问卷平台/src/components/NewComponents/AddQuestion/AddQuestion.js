import React, { Component } from 'react';
import classNames from "classnames";
import styles from './AddQuestion.scss'
// import { RADIO, CHECKBOX, TEXT } from "../../../constants/QuestionTypes";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as types from '../../../constants/QuestionTypes'
class AddQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    renderChooseQuestionType(addQuestion) {
        // const RADIO = 'RADIO',
        //       CHECKBOX = 'CHECKBOX',
        //       TEXT = 'TEXT'
        if (this.state.show) {
            return (
                // <QueueAnim
                //     type={['bottom', 'top']}
                //     ease={['easeOutQuart', 'easeInOutQuart']}>
                //     <div className={styles['type-wrapper']} key='type-wrapper'>
                //         <div className={classNames(styles.type, styles.radio)} onClick = {()=>{addQuestion(types.RADIO)}}>单选</div>
                //         <div className={classNames(styles.type, styles.checkbox)} onClick = {()=>addQuestion(types.CHECKBOX)}>多选</div>
                //         <div className={classNames(styles.type, styles.text)} onClick = {()=>addQuestion(types.TEXT)}>文本</div>
                //     </div>
                // </QueueAnim>)
                <div className={styles['type-wrapper']} key='type-wrapper'>
                    <div className={classNames(styles.type, styles.radio)} onClick={() => { addQuestion(types.RADIO) }}>单选</div>
                    <div className={classNames(styles.type, styles.checkbox)} onClick={() => addQuestion(types.CHECKBOX)}>多选</div>
                    <div className={classNames(styles.type, styles.text)} onClick={() => addQuestion(types.TEXT)}>文本</div>
                </div>)

        }
    }

    toogleAddQuestionType() {
        this.setState({
            show: !this.state.show
        })

    }

    render() {
        const { addQuestion } = this.props
        return (
            <div className={styles['add-question']}>
                <ReactCSSTransitionGroup
                    transitionName={styles}
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {this.renderChooseQuestionType(addQuestion)}
                </ReactCSSTransitionGroup>
                <div className={styles["add-question-btn"]}
                    key='a'
                    onClick={::this.toogleAddQuestionType}>
                    <span>添加问题</span>
            </div>

            </div >
            )

    }
}

export default AddQuestion