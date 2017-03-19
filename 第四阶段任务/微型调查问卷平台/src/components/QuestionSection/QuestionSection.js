import React, { Component, PropTypes } from 'react';
import styles from './QuestionSection.scss';
import classNames from "classnames";

const QuestionSection = props => {
    return (
        <div className={styles['type-wrapper']}>
            <div className={classNames(styles.type, styles.radio)}>单选</div>
            <div className={classNames(styles.type, styles.checkbox)}>多选</div>
            <div className={classNames(styles.type, styles.text)}>文本</div>
        </div>
    )
}

QuestionSection.propTypes = {

}

export default QuestionSection