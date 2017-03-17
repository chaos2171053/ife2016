import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions/calendar'

// const mapStateToProps = state => ({

//     calendar: state.calendar
// })
const mapStateToProps = state => {

    return {


    calendar: state.rootReducer.calendar

    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
class Edit extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <div>
                <Link to='/'> <span>ddd</span></Link>

            </div>
        )
    }
}
// Edit.propTypes = {
//     children: PropTypes.element.isRequired
// };
export default Edit