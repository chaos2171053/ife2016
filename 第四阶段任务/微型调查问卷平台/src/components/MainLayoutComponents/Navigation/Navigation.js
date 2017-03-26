import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import styles from '../../../containers/MainLayout/MainLayout.scss'
import classNames from "classnames";
// const Navigation = () => (
//     <div className={styles.nav}>
//         <div className={styles.container}>
//             <div className={styles.header}>
//                 <Link to='/home'>
//                     <span className={styles.home}>首页</span>
//                 </Link>
//             </div>
//             <div className={styles.collapse}>
//                 <ul className = {classNames({[styles['content']]:true})}>
//                     <li className={styles.title}><Link to='/home'>问卷列表 </Link></li>
//                     <li className={styles.title}><Link to='/'>离开</Link></li>
//                 </ul>
//             </div>
//         </div>
//     </div>
// )
const Navigation = ({ signout }) => {

    return (
        <div className={styles.nav}>
            <div className={classNames({ [styles['container']]: true, [styles['clearfix']]: true })}>
                <Link to='/home'>
                    <div className={styles.home}>首页</div>
                </Link>
                <Link to='/home'>
                    <div className={styles.list}> 问卷列表</div>
                </Link>
                <div className={styles.signout} onClick = {signout}>登出</div>
 
        </div>
            </div >
        )

}
export default Navigation