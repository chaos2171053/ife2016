import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import { Link, Redirect } from 'react-router-dom'

// const FormItem = Form.Item;
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/status'

import '../../styles/reset.css';
import styles from './Login.scss'
import classNames from "classnames";

import { Main } from '../';


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
        this.state = {
            chooseSignin:false,
            chooseSignup:true
        }
    }

    renderHeader() {
        return (
            <div className={styles.header}>
                <div className={styles['logo-wrapper']}><h1 className={styles.logo}>问吧</h1></div>
                <h2 className={styles.subtitle}>与世界分享你瞎编的问卷</h2>
            </div>
        )
    }
    renderNavs() {
        return (
            <div className={styles.navs}>
                <div className={styles['navs-slider']}>
                    <a href='#' className={classNames({[styles['active']]:this.state.chooseSignup})}>注册</a>
                    <a href='#' className={classNames({active:this.state.chooseSignin})}>登录</a>
                    <span className={styles['navs-slider-bar']}></span>
                </div>
            </div>
        )
    }
    render() {
        const { actions: { logIn }, status: { isLogin } } = this.props;
        if (isLogin) {
            return <Redirect to='/home' />
        }
        // return(
        //     <div>
        //     <Button onClick = {logIn}></Button>
        //     </div>
        // )
        // return (
        //     <div className={styles.main}>
        //         <div calssName={styles.header}>
        //             <h1 className={styles.logo}>问吧</h1>
        //             <h2 className={styles.subtitle}>与世界分享你瞎编的问卷</h2>
        //         </div>
        //         <div className={styles['tab-navs']}>
        //             <a href='#'>注册</a>
        //             <a href='#'>登录</a>
        //         </div>
        //         <div className={styles.register}>
        //             <div className={styles['group-input']}>
        //                 <div clsssName={styles.username}>
        //                     <input type='text' placeholder='用户名' />
        //                 </div>
        //                 <div clsssName={styles.phone}>
        //                     <input type='tel' placeholder='手机号(仅支持中国大陆)' />
        //                 </div>
        //                 <div clsssName={styles.password}>
        //                     <input type='password' placeholder='密码(不少于6位)' />
        //                 </div>
        //                 <div>注册问吧</div>
        //                 <p>点击「注册」按钮，即代表你同意《豆腐脑是甜的的协议》</p>
        //             </div>
        //         </div>
        //     </div>
        // )
        return (
            <div className={styles.main}>
                <div className={styles['main-body']}>
                    {this.renderHeader()}
                    <div className={styles.content}>
                        {this.renderNavs()}
                        <div className={styles.signup}>
                            <form className={styles['login-box']}>
                                <div className={styles['group-inputs']}>
                                    <div className={styles.username}>
                                        <input type='text' name='username' placeholder='用户名' />
                                    </div>
                                    <div className={styles.phonenumber}>
                                        <input type='text' name='phonenumber' placeholder='手机号（仅支持中国大陆)' />
                                    </div>
                                    <div className={styles.password}>
                                        <input type='password' name='password' placeholder='密码（不少于6位）' />
                                    </div>
                                </div>
                                <div className={styles['button-wrapper']}>
                                    <button className={styles['sign-button']}>注册问吧</button>
                                </div>
                            </form>
                            <p className={styles.agreement}>点击「注册」按钮，即代表你同意
                        <a href='#'>《豆腐脑是甜的协议》</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

//  Login = Form.create()(Login);

export default Login