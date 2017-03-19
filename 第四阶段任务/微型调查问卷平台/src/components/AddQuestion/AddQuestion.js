import React, { PropTypes, Component } from 'react';
import QuestionType from '../index'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styles from './AddQuestion.scss'
import classNames from "classnames";

class AddQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
    }

    renderChooseQuestionType() {

        if (this.state.show) {
            return (
                <div>
                    <div className={styles['type-wrapper']}>
                        <div className={classNames(styles.type, styles.radio)}>单选</div>
                        <div className={classNames(styles.type, styles.checkbox)}>多选</div>
                        <div className={classNames(styles.type, styles.text)}>文本</div>
                    </div>
                </div>)

        }
    }

    toogleAddQuestionType() {
        this.setState({
            show:!this.state.show
        })

    }

    render() {
        return (
            <div className={styles['add-question']}>
                {this.renderChooseQuestionType()}
                <div className={styles["add-question-btn"]}
                     onClick = {::this.toogleAddQuestionType}>
                    <span>添加问题</span>
                </div>
            </div>
        )

    }
}

export default AddQuestion