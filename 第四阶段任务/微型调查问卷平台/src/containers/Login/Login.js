import React, { Component,PropTypes } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import { Link, Redirect } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/status'

import '../../styles/reset.css';
import styles from './Login.scss'
import classNames from "classnames";

import { Main } from '../';
import { LoginComponents } from '../../components'

const { Header, Navigation, Signup, Signin } = LoginComponents

const mapStateToProps = state => ({
    status: state.rootReducer.status
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)

class Login extends Component {
    static propTypes = {
        actions: React.PropTypes.shape({
            logIn: React.PropTypes.func.isRequired,
            renderSignin: React.PropTypes.func.isRequired,
            renderSignup: React.PropTypes.func.isRequired,
        }),
        status: React.PropTypes.shape({
            isRenderSignin: React.PropTypes.bool.isRequired,
            isRenderSignup: React.PropTypes.bool.isRequired,
        }),
    }
    constructor(props) {
        super(props);
    }

    render() {
        const {
            actions: { logIn, renderSignin, renderSignup, },
            status: { isLogin, isRenderSignin, isRenderSignup }
        } = this.props;

        //如果已经登录过，则调到home页面
        if (isLogin) {
            return <Redirect to='/home' />
        }

        return (
            <div className={styles['main-warpper']}>
                <div className={styles.main}>
                    <div className={styles['main-body']}>
                        <Header />
                        <div className={styles.content}>
                            <Navigation {...this.props} />
                            {isRenderSignup ? (<Signup />) : (<Signin />)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default Login