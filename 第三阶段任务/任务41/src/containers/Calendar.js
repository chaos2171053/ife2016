import React, { Component } from 'react';
import CalendarHeader from '../components/CalendarHeader'
import CalendarBody from '../components/CalendarBody'
import CalendarFooter from '../components/CalendarFooter'
import CSSModules from 'react-css-modules';
import styles from './Calendar.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions/calendar'
const mapStateToProps = state => ({
  calendar: state.calendar
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class Calendar extends Component {
    constructor(props){
        super(props);
    }
    
    //切换显示日历组件
    toogleShow() {
    }

    render() {
        const {actions,calendar} = this.props
        console.log(actions)
        console.log(calendar)

        return (
            <div styleName='calendar'>
                <p styleName='date-picked' 
                    onClick = {::this.toogleShow} 
                    >2017/3/11</p>
                <div styleName="main">
                    <CalendarHeader />
                    <CalendarBody />
                    <CalendarFooter />
                </div>
            </div>
        )
    }
}

export default Calendar
// export default CSSModules(Calendar, styles);