import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'
// import { Button } from 'antd';
import styles from './Home.scss';

import QueueAnim from 'rc-queue-anim';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {

    }
    handleAddQuestionnaire() {

    }

    //如果系统中没有问卷，则显示新建问卷
    renderNewQuestionnaireLayout() {
        const config = {opacity:[1, 0]}
        return (
            <Link to='/edit' className={styles.link}>
                <QueueAnim className="demo-page" key="page" type="bottom" delay = '800' animConfig= {config}>
                    <div className={styles['add-btn']} key = 'add'>
                        {/*<Button type="primary" className = {styles['ant-btn ant-btn-primary']}>新建问卷</Button>*/}

                        <span>新建问卷</span>
                    </div>
                </QueueAnim>
            </Link>

        )

    }
    a() {
        return (<div>666</div>)
    }

    render() {
        let a = 2;
        return a > 1 ? (

            <div key='1'>
                <div className={styles.wrapper} key='2'>
                    {this.renderNewQuestionnaireLayout()}
                </div>
            </div>
        ) : (
                <div>
                    {this.a()}
                </div>)
    }
}
export default Home