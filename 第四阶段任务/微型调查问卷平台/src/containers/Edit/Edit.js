import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions/calendar'
import styles from './Edit.scss'

//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import {QuestionSection} from　'../../components'

// const mapStateToProps = state => ({

//     calendar: state.calendar
// })
const mapStateToProps = state => {
    return {
        calendar: state.rootReducer.calendar
    }
}

// const mapDispatchToProps = dispatch => ({
//     actions: bindActionCreators(Actions, dispatch)
// })
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }

}

@connect(mapStateToProps, mapDispatchToProps)
class Edit extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <div>
                <input placeholder="Enter your userName" className={styles["edit-questionnaire-title"]}></input>
                <hr className={styles.line} />
                <div>展示问题</div>
                <div className={styles['add-question']}>
                    <QuestionSection></QuestionSection>
                    <div className={styles["add-question-btn"]}>
                        <span>添加问题</span>
                    </div>
                </div>
                <hr className={styles.line} />
                <div className={styles.footer}>
                    <div className={styles["date-wrap"]}>
                        <span>问卷截止日期</span>
                    </div>
                    <input
                        type="button"
                        value="保存问卷"
                    />
                    <input
                        type="button"
                        value="发布问卷"
                    />
                </div>
            </div>
        )
    }
}
// Edit.propTypes = {
//     children: PropTypes.element.isRequired
// };
export default Edit