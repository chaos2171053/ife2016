import React, { Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as StatusActions from '../../actions/status'
import * as QuestionnairesActions from '../../actions/questionnaires'

import '../../styles/reset.css';
import styles from './Login.scss'
import classNames from "classnames";

import { Main } from '../';
import { LoginComponents } from '../../components'

const { Header, Navigation, Signup, Signin } = LoginComponents

const mapStateToProps = state => ({
    status: state.rootReducer.status,
    questionnaires:state.rootReducer.questionnaires,
})


const mapDispatchToProps = dispatch => ({
    actions: Object.assign({},
        bindActionCreators(StatusActions, dispatch),
        bindActionCreators(QuestionnairesActions, dispatch),
    )
})

@connect(mapStateToProps, mapDispatchToProps)

class Login extends Component {
    static propTypes = {
        actions: React.PropTypes.shape({
            logIn: React.PropTypes.func.isRequired,
            renderSignin: React.PropTypes.func.isRequired,
            renderSignup: React.PropTypes.func.isRequired,
            userSignup:React.PropTypes.func.isRequired,
        }),
        status: React.PropTypes.shape({
            isRenderSignin: React.PropTypes.bool.isRequired,
            isRenderSignup: React.PropTypes.bool.isRequired,
        }),
        questionnaires: React.PropTypes.arrayOf(React.PropTypes.object)
    }
    constructor(props) {
        super(props);
    }

    render() {
        const {
            actions: { logIn, renderSignin, renderSignup,userSignup},
            status: { isLogin, isRenderSignin, isRenderSignup },
            questionnaires,
        } = this.props;
        //如果已经登录过，跳到home页面
        if (isLogin) {
            return <Redirect to='/home' />
        }

        return (
            <div className={styles['main-warpper']}>
                <div className={styles.main}>
                    <div className={styles['main-body']}>
                        <Header/>
                        <div className={styles.content}>
                            <Navigation {...this.props} />
                            {isRenderSignup ? 
                                (<Signup 
                                    questionnaires = {questionnaires}
                                    userSignup = {userSignup}/>) 
                                : (<Signin />)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default Login