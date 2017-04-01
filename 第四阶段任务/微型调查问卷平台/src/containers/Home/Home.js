import React, { Component, PropTypes } from 'react';
import styles from './Home.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table } from '../../components'
import { RELEASED } from '../../constants/QuestionTypes'
import * as Actions from '../../actions/questionnaires';

const mapStateToProps = state => ({
    username: state.rootReducer.status.username,
    userInfomations: state.rootReducer.questionnaires
})
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})
@connect(mapStateToProps,mapDispatchToProps)

class Home extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        username: PropTypes.string.isRequired,
        userInfomations: PropTypes.array.isRequired
    }

    //关闭过期的问卷
    componentWillMount() {
        const { username, userInfomations,actions:{closeQuestionnaire} } = this.props;
        let questionnairesArray;
        userInfomations.map(user => {
            if (user.username === username) {
                questionnairesArray = user.questionnaires
                for (let i = 0, len = questionnairesArray.length; i < len; i++) {
                    if (questionnairesArray[i].status === RELEASED) {
                        const now = new Date().valueOf()
                        if (questionnairesArray[i].deadline < now) {
                            closeQuestionnaire(username,i);
                        }
                    } else {
                        continue
                    }
                }

            }
        })
    }
    render() {
        const { username, userInfomations } = this.props;
        let questionnairesArray;
        userInfomations.map(user => {
            if (user.username === username) {
                questionnairesArray = user.questionnaires
            }
        })
        if (questionnairesArray.length !== 0) {
            return <div> <Table questionnairesArray={questionnairesArray} /></div>
        }
        return (
            <div>
                <div className={styles['new-questionnaire-wrapper']}>
                    <h1 className={styles.title}>空空如也 /(ㄒoㄒ)/~~</h1>
                    <Link to='/new'>
                        <button className={styles['new-questionnaire-btn']}>新建问卷</button>
                    </Link>
                </div>
            </div>
        )
    }
}



export default Home