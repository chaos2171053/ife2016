import React, { Component,PropTypes } from 'react';
import styles from '../../../containers/Login/Login.scss'
import classNames from "classnames";
import { message } from 'antd';

import {trim}from '../../../utils/util'
const success = () => {
    message.success('注册成功~');
};
const error = (msg) => {
  message.error(msg);
};
class Signup extends Component {
    static propTypes = {
        
    }
    //校验登录信息
    validata(){
        const phoneRegx = /^1(3|4|5|7|8)[0-9]\d{8}$/;
        const {username,phonenumber,password} =this.refs;
        const {} = this.props;
        
        let userName = trim(username.value),
            phoneNumber = trim(phonenumber.value),
            passWord = trim(password.value);

            if(userName === null || userName === undefined || userName === '') {
                return '请填写用户名'
            }
            if(phoneNumber === null || phoneNumber === undefined || phoneNumber === '') {
                return '请填写手机号'
            } 
            if(!phoneRegx.test(phoneNumber)) {
                return '请填写有效的手机号'
            }
            if(passWord === null || passWord === undefined || passWord === '') {
                return '请填写密码'
            }
            if(passWord.length<6) {
                return '密码长度不少于6位'
            }
           
           
            return true
    }

    //处理注册
    handleSignup(){
        this.validata() === true ? success(): error(this.validata()) ;
    }
    render() {
        const a = 'fuck'
        return (
            <div className={styles['signup-signin']}>
                <div className={styles['login-box']}>
                    <div className={styles['group-inputs']}>
                        <div className={styles['input-wrapper']}>
                            <input type='text' ref = 'username'name='username' placeholder='用户名' />
                        </div>
                        <div className={classNames({
                            [styles['input-wrapper']]: true,
                            [styles['phonenumber']]: true
                        })}>
                            <input type='text' ref = 'phonenumber' name='phonenumber' placeholder='手机号（仅支持中国大陆)' />
                        </div>
                        <div className={classNames({
                            [styles['input-wrapper']]: true,
                            [styles['password']]: true
                        })}>
                            <input type='password' ref = 'password' name='password' placeholder='密码（不少于6位）' />
                        </div>
                    </div>
                    <div className={styles['button-wrapper']}>
                        <button
                            className={styles['signin-signup-button']}
                            onClick={::this.handleSignup}>注册问啊</button>
                    </div>
                </div>
                <p className={styles.agreement}>点击「注册」按钮，即代表你同意
                                <a href='#'>《豆腐脑是甜的协议》</a>
                </p>
            </div>
        )
    }
}


export default Signup;