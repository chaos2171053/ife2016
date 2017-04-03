import React,{PropTypes} from 'react';
import { Link} from 'react-router-dom'
import styles from '../../../containers/MainLayout/MainLayout.scss'
import classNames from "classnames";
const Navigation = ({ signout }) => {

    return (
        <div className={styles.nav}>
            <div className={classNames({ [styles['container']]: true, [styles['clearfix']]: true })}>
                <Link to='/home'>
                    <div className={styles.home}>我的问卷</div>
                </Link>
                <Link to='/new'>
                    <div className={styles.list}>新建问卷</div>
                </Link>
                <div className={styles.signout} onClick = {signout}>登出</div>
        </div>
            </div >
        )

}
Navigation.proTypes = {
    signout:PropTypes.func.isRequired
}
export default Navigation