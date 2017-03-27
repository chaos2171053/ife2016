import React, { Component } from 'react';
import styles from './Main.scss';
import { Radio } from 'antd';
const SingleChoice = () => {

    return (
        <div className={styles['single-choice']}>
            <div>
                <span>Q1(单选题)</span>
                <input placeholder= '请填写题目'/>
            </div>
            <div className={styles['options-wrapper']}>
                <div className={styles['options']}>
                    <span className={styles['radio-icon']} />
                    <input placeholder= '请填写题目'/>
                </div>
                <div className={styles['options']}>
                    <span className={styles['radio-icon']} />
                    <input placeholder= '请填写题目'/>
                </div>
            </div>
        </div>

    )

}
export default SingleChoice