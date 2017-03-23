import React, { PropTypes } from "react";
import styles from '../../../containers/Login/Login.scss'
import classNames from "classnames";

const Signin = () => {
    return (
        <div className={styles['signup-signin']}>
            <div className={styles['login-box']}>
                <div className={styles['group-inputs']}>
                    <div className={styles['input-wrapper']}>
                        <input type='text' name='username' placeholder='用户名' />
                    </div>
                    <div className={classNames({
                        [styles['input-wrapper']]: true,
                        [styles['password']]: true
                    })}>
                        <input type='password' name='password' placeholder='密码' />
                    </div>
                </div>
                <div className={styles['button-wrapper']}>
                    <button className={styles['signin-signup-button']}>登录</button>
                </div>
                <p className={styles.agreement}>
                也可以使用测试账号chaos666，密码666666
                </p>
            </div>
        </div>
    )
}
export default Signin