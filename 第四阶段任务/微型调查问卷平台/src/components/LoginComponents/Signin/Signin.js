import React, { Component, PropTypes } from 'react';
import styles from '../../../containers/Login/Login.scss'
import classNames from 'classnames';
import { trim } from '../../../utils/util'
import { message } from 'antd';
import { Link,Redirect } from 'react-router-dom'
class Signin extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        questionnaires: React.PropTypes.arrayOf(React.PropTypes.object)
    }

    success(userName) {
        // this.props.userSignin(userName, phoneNumber, passWord)
        this.props.logIn()
        return message.success(`哈喽~${userName}`);
        
    };

    error(msg) {
        return message.error(msg);
    };

    //校验登录信息
    validata(questionnaires, userName, passWord) {  
        if (userName === null || userName === undefined || userName === '') {
            return '请填写用户名'
        }
        if (passWord === null || passWord === undefined || passWord === '') {
            return '请填写密码'
        }
        if (passWord.length < 6) {
            return '密码长度不少于6位'
        }
 
        if (questionnaires.some(data => {
            return (data.username === userName) && (data.password === passWord)
        })) {
            return true
        }else {
            return '用户名或密码不正确'
        }
        
    }

    handleSignin() {
        const { username, password } = this.refs;
        const { questionnaires } = this.props;
        let userName = trim(username.value),
            passWord = trim(password.value);

        const result = this.validata(questionnaires, userName, passWord)
        if (result === true) {
            this.success(userName);
        } else {
            this.error(result)
        }
    }
    render() {

        return (
            <div className={styles['signup-signin']}>
                <div className={styles['login-box']}>
                    <div className={styles['group-inputs']}>
                        <div className={styles['input-wrapper']}>
                            <input type='text' name='username' placeholder='用户名' ref='username' />
                        </div>
                        <div className={classNames({
                            [styles['input-wrapper']]: true,
                            [styles['password']]: true
                        })}>
                            <input type='password' name='password' placeholder='密码' ref='password' />
                        </div>
                    </div>
                    <div className={styles['button-wrapper']}>
                        <button
                            onClick={::this.handleSignin}
                            className={styles['signin-signup-button']}>登录</button>
                </div>
                <p className={styles.agreement}>
                    也可以使用测试账号chaos666，密码666666
                </p>
            </div>
            </div >
        )
    }
}

export default Signin