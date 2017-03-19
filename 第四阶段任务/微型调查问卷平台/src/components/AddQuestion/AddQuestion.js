import React, { PropTypes, Component } from 'react';
import QuestionType from '../index'
import styles from './AddQuestion.scss'
import classNames from "classnames";

import QueueAnim from 'rc-queue-anim';

class AddQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    renderChooseQuestionType() {
        if (this.state.show) {
            return (
                <QueueAnim
                    type={['bottom', 'top']}
                    ease={['easeOutQuart', 'easeInOutQuart']}>
                    <div className={styles['type-wrapper']} key='type-wrapper'>
                        <div className={classNames(styles.type, styles.radio)}>单选</div>
                        <div className={classNames(styles.type, styles.checkbox)}>多选</div>
                        <div className={classNames(styles.type, styles.text)}>文本</div>
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
        return (
            <div className={styles['add-question']}>
                {this.renderChooseQuestionType()}
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