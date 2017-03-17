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
                <div

                    onClick={::this.handleAddQuestionnaire}
            >
               <Link to = '/edit'> <span>新建问卷</span></Link>
            </div>
        </div >
        )
    }
}
export default Home