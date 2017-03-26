import React, { Component, PropTypes } from 'react';
import styles from './Home.scss'
class Home extends Component {
    static propTypes = {

    }
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <div className = {styles['new-questionnaire-wrapper']}>
                <h1 className = {styles.title}>空空如也/(ㄒoㄒ)/~~</h1>
                    <button className={styles['new-questionnaire-btn']}>新建问卷</button>
                </div>
            </div>
        )
    }
}



export default Home