import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styles from './Header.scss';
const Header = () => (
    <div className={styles.header}>
        <h1 className={styles.home}>首页</h1>
        <Link to = '/edit'>
        <h1>新建问卷</h1>
        </Link>
    </div>
)
// class Header extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <div className={styles.header}>
//                 <h1 className={styles.home}>首页</h1>
//             </div>
//         )
//     }
// }
export default Header;