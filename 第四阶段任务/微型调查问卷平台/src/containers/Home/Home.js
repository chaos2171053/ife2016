import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router-dom'

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
            <div>
            <Link to ='edit'>
            <div>创建问卷</div>
            
            </Link>
            </div>
        )
    }
}
export default Home