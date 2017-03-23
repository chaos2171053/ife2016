import React from 'react';
import styles from '../../../containers/Login/Login.scss'
import classNames from "classnames";

const Signup = ()=>{
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
                        <button className={styles['sign-button']}>注册问啊</button>
                    </div>
                </div>
                <p className={styles.agreement}>点击「注册」按钮，即代表你同意
                                <a href='#'>《豆腐脑是甜的协议》</a>
                </p>
            </div>
        )
}

export default Signup;