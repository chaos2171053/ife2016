import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom'
import styles from './Header.scss';
import QueueAnim from 'rc-queue-anim';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/status'

const mapStateToProps = state => ({
    status: state.rootReducer.status
})
// const mapStateToProps = (state, ownProps) => {
//     debugger
//     return {
//         prop: state.prop
//     }
// }

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)

class Header extends Component {
    constructor(props) {
        super(props);
    }

    exit() {
        const {actions:{signOut}} = this.props;
        signOut();
        return <Redirect to='/'/>
    }
    render() {
        const config = { opacity: [1, 0], translateX: [0, 150] }//动画设置

        const {actions:{signOut},status:{isLogin}} = this.props;
        
        //登出
        if(!isLogin) {
            return <Redirect to='/'/>
        }

        return (
            <div>
                <QueueAnim className="queue-anim-header" duration='1000' animConfig={config}>
                    <div className={styles.header} key='header'>
                        <h1 className={styles.home} key='home'>首页</h1>
                        <Link to='/edit' key='link'>
                            <h1 >新建问卷</h1>
                        </Link>
                        <button onClick = {signOut}>退出</button>
                    </div>
                </QueueAnim>
            </div>
        )
    }
}
export default Header;