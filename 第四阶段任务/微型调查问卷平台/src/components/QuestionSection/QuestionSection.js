import React, { Component } from 'react';
import styles from './QuestionSection.scss';
class QuestionSection extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className={styles['type-wrapper']}>
                <div className = 'radio'>单选</div>
                <div className = 'checkbox'>多选</div>
                <div className = 'text'>文本</div>
            </div>
        )
    }
}

export default QuestionSection