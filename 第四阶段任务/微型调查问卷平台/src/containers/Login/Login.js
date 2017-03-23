import React, { Component } from 'react';
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

const {Header} = LoginComponents

const mapStateToProps = state => ({
    status: state.rootReducer.status
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)

class Login extends Component {
    constructor(props) {
        super(props);
    }

    // renderHeader() {
    //     return (
    //         <div className={styles.header}>
    //             <div className={styles['logo-wrapper']}><h1 className={styles.logo}>问吧</h1></div>
    //             <h2 className={styles.subtitle}>与世界分享你瞎编的问卷</h2>
    //         </div>
    //     )
    // }
    renderNavs() {
        const { actions: { logIn,renderSignin,renderSignup, }, status: { isRenderSignin,isRenderSignup } } = this.props;
        
        return (
            <div className={styles.navs}>
                <div className={styles['navs-slider']}>
                    <span className={classNames({ [styles['active']]: isRenderSignup })}
                                onClick ={renderSignup}>注册</span>
                    <span className={classNames({ [styles['active']]: isRenderSignin })}
                                onClick ={renderSignin}>登录</span>
                    <span className={classNames({
                        [styles['navs-slider-bar']]: true, 
                        [styles['bar-active']]: isRenderSignin,                      
                    })}></span>
                </div>
            </div>
        )
    }

    renderSignup() {
        return (
            <div className={styles.signup}>
                <div className={styles['login-box']}>
                    <div className={styles['group-inputs']}>
                        <div className={styles['input-wrapper']}>
                            <input type='text' name='username' placeholder='用户名' />
                        </div>
                        <div className={classNames({
                            [styles['input-wrapper']]:true,
                            [styles['phonenumber']]:true
                        })}>                    
                            <input type='text' name='phonenumber' placeholder='手机号（仅支持中国大陆)' />
                        </div>
                        <div className={classNames({
                            [styles['input-wrapper']]:true,
                            [styles['password']]:true
                        })}> 
                            <input type='password' name='password' placeholder='密码（不少于6位）' />
                        </div>
                    </div>
                    <div className={styles['button-wrapper']}>
                        <button className={styles['sign-button']}>注册问吧</button>
                    </div>
                </div>
                <p className={styles.agreement}>点击「注册」按钮，即代表你同意
                                <a href='#'>《豆腐脑是甜的协议》</a>
                </p>
            </div>
        )
    }
    renderSignin() {
        return(
            <div>123</div>
        )
    }
    render() {
        const { actions: { logIn,renderSignin,renderSignup, }, status: { isLogin,isRenderSignin,isRenderSignup } } = this.props;
        
        //如果已经登录过，则调到home页面
        if (isLogin) {
            return <Redirect to='/home' />
        }

        return (
            <div className = {styles['main-warpper']}>
            <div className={styles.main}>
                <div className={styles['main-body']}>
                    <Header/>
                    <div className={styles.content}>
                        {this.renderNavs()}
                        {isRenderSignup?(this.renderSignup()):(this.renderSignin())}
                    </div>
                </div>
            </div>
            </div>
        )
    }


}



export default Login