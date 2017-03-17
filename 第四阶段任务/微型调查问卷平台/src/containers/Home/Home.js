import React, { Component, PropTypes } from 'react';


class Home extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {

    }
    handleAddQuestionnaire() {
        
    }
    render() {
        <div>
            <div
                className={styles["add-btn"]}
                onClick={::this.handleAddQuestionnaire}
            >
                <span>新建问卷</span>
            </div>
        </div>
    }
}
export default Home