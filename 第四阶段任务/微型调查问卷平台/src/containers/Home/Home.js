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
    render() {

        return (
            <div className = {styles.wrapper}>
                <Link to='/edit' className = {styles.link}>
                    <div className = {styles['add-btn']}>
                {/*<Button type="primary" className = {styles['ant-btn ant-btn-primary']}>新建问卷</Button>*/}
                    <span>新建问卷</span>
                    </div>
                </Link>
            </div>
        )
    }
}
export default Home