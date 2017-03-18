import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'
// import { Button } from 'antd';
import styles from './Home.scss';

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
        return (
            <Link to='/edit' className={styles.link}>
                <div className={styles['add-btn']}>
                    {/*<Button type="primary" className = {styles['ant-btn ant-btn-primary']}>新建问卷</Button>*/}
                    <span>新建问卷</span>
                </div>
            </Link>
        )

    }
    a() {
        return (<div>666</div>)
    }

    render() {
        let a = 2;
        return a > 1 ? (
            <div className={styles.wrapper}>
                {this.renderNewQuestionnaireLayout()}
            </div>) : (
                <div>
                {this.a()}
                </div>)
    }
}
export default Home