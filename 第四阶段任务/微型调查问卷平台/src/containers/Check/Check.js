import React, { Component, PropTypes } from 'react';
import styles from './Check.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CheckComponents } from '../../components'
import { Link, withRouter } from 'react-router-dom'
const { Main } = CheckComponents

export default class Check extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        location: React.PropTypes.shape({
            questionnaire: PropTypes.object.isRequired,
        }),
    }
    render() {
        const { questionnaire } = this.props.location;
        const { questions, fillData } = questionnaire;
        // console.log(questionnaire)
        return (
            <div className={styles.main}>
                <div className={styles.header}>
                    <h1>{questionnaire.questionnarireTitle}</h1>
                </div>
                <hr className={styles.hr} />
                <div className={styles['questions-wrapper']}>
                    <Main
                        questions={questions}
                        fillData={fillData} />
                </div>
                <hr className={styles.hr} />
                <div className={styles.footer}>
                    <Link to='/home' className={styles.link}>
                        <button>返回</button>
                    </Link>
                </div>
            </div>
        )
    }
}