import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import classNames from "classnames";
import styles from './AddQuestion.scss'
class AddQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    renderChooseQuestionType(addRadioQuestion) {
        const RADIO = 'RADIO',
              CHECKBOX = 'CHECKBOX',
              TEXT = 'TEXT'
        if (this.state.show) {
            return (
                <QueueAnim
                    type={['bottom', 'top']}
                    ease={['easeOutQuart', 'easeInOutQuart']}>
                    <div className={styles['type-wrapper']} key='type-wrapper'>
                        <div className={classNames(styles.type, styles.radio)} onClick = {()=>addRadioQuestion('RADIO')}>单选</div>
                        <div className={classNames(styles.type, styles.checkbox)} onClick = {()=>addRadioQuestion('CHECKBOX')}>多选</div>
                        <div className={classNames(styles.type, styles.text)} onClick = {()=>addRadioQuestion('TEXT')}>文本</div>
                    </div>
                </QueueAnim>)

        }
    }

    toogleAddQuestionType() {
        this.setState({
            show: !this.state.show
        })

    }

    render() {
        const {addRadioQuestion} = this.props
        return (
            <div className={styles['add-question']}>
                {this.renderChooseQuestionType(addRadioQuestion)}
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