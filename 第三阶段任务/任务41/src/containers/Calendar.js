import React from 'react';
import CalendarHeader from '../components/CalendarHeader'
import CalendarBody from '../components/CalendarBody'
import CalendarFooter from '../components/CalendarFooter'
const Calendar = () => (
    <div className = {styles.calendar}>
        <p className = {styles['date-picked']}>2017/3/11</p>
        <div className = {styles.main}>
            <CalendarHeader/>
            <CalendarBody/>
            <CalendarFooter/>
        </div>
    </div>
)

export default Calendar