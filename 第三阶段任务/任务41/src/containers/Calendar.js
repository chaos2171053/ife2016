import React from 'react';
import CalendarHeader from '../components/Calendar/CalendarHeader'
import CalendarBody from '../components/Calendar/CalendarBody'
import CalendarFooter from '../components/Calendar/CalendarFooter'
const Calendar = () => (
    <div>
        <p>2017/3/11</p>
        <div className = "main">
            <CalendarHeader/>
            <CalendarBody/>
            <CalendarFooter/>
        </div>
    </div>
)

export default Calendar