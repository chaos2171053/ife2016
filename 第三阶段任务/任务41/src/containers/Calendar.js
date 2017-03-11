import React from 'react';
import CalendarHeader from '../components/Calendar/CalendarHeader'
import CalendarBody from '../components/Calendar/CalendarBody'
import CalendarFooter from '../components/Calendar/CalendarFooter'
import styles from './Calendar.scss'
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