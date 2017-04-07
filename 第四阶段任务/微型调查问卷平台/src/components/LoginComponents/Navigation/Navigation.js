import React, { PropTypes} from "react";
import styles from '../../../containers/Login/Login.scss'
import classNames from "classnames";

const Navigation = ({ actions, status }) => {
    const { renderSignin, renderSignup } = actions;
    const { isRenderSignin, isRenderSignup } = status;

    return (
        <div className={styles.navs}>
            <div className={styles['navs-slider']}>
                <span className={classNames({ [styles['active']]: isRenderSignup })}
                    onClick={renderSignup}>注册</span>
                <span className={classNames({ [styles['active']]: isRenderSignin })}
                    onClick={ renderSignin}>登录</span>
                <span className={classNames({
                    [styles['navs-slider-bar']]: true,
                    [styles['bar-active']]: isRenderSignin,
                })}></span>
            </div>
        </div>
    )
}

Navigation.propTypes = {
    actions: PropTypes.shape({
        logIn: PropTypes.func,
        renderSignin: PropTypes.func,
        renderSignup: PropTypes.func,
    }),
    status: PropTypes.shape({
        isRenderSignin: PropTypes.bool,
        isRenderSignup: PropTypes.bool,
    }),
};
export default Navigation