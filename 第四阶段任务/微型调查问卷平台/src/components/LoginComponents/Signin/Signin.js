import React, { Component, PropTypes } from 'react';
import styles from '../../../containers/Login/Login.scss'
import classNames from 'classnames';
import { trim } from '../../../utils/util'
import { message } from 'antd';
// import { Redirect } from 'react-router-dom'
class Signin extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        logIn: React.PropTypes.func,
        questionnaires: React.PropTypes.arrayOf(React.PropTypes.object)
    }

    success(userName) {
        
        const now = new Date(),
            hour = now.getHours();
            let msg = '';
        if (hour < 6) { msg = '凌晨好~' }
        else if (hour < 9) { msg = '早上好~' }
        else if (hour < 12) { msg = '上午好~' }
        else if (hour < 14) { msg = '中午好~' }
        else if (hour < 17) { msg = '下午好~' }
        else if (hour < 19) { msg = '傍晚好~' }
        else if (hour < 22) { msg = '晚上好~' }
        else { document.write("夜里好！") }
        this.props.logIn(userName)
        return message.success(`${msg}${userName}`);

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
        } else {
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
                    也可以使用测试账号666666，密码666666
                </p>
            </div>
            </div >
        )
    }
}

export default Signin