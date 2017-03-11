import React, { Component } from 'react';
import CalendarHeader from '../components/CalendarHeader'
import CalendarBody from '../components/CalendarBody'
import CalendarFooter from '../components/CalendarFooter'
import CSSModules from 'react-css-modules';
import styles from './Calendar.scss'
@CSSModules(styles)
class Calendar extends Component {
    render() {
        return (
            <div styleName='calendar'>
                <p styleName='date-picked'>2017/3/11</p>
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