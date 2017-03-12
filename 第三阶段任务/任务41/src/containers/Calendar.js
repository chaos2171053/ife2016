import React, { Component, PropTypes } from 'react';
import CalendarHeader from '../components/CalendarHeader'
import CalendarBody from '../components/CalendarBody'
import CalendarFooter from '../components/CalendarFooter'
import CSSModules from 'react-css-modules';
import styles from './Calendar.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
    constructor(props) {
        super(props);
    }
    static propTypes = {
        actions: PropTypes.object.isRequired,
        calendar: PropTypes.object.isRequired
    }

    //切换显示日历组件
    toogleShow() {
        this.refs.main.style.height = this.refs.main.style.height === '460px' ? '0px' : '460px';
    }
    //切换到上一个月
    prevMonth() {
        const { calendar: { month }, actions: { previousMonth } } = this.props;
        previousMonth(month);
    }

    //切换下一个月
    nextMonth() {
        const { calendar: { month }, actions: { nextMonth } } = this.props;
        nextMonth(month);
    }
    //选择日期
    datePick(day) {
       const {actions: { datePick }} = this.props;
       datePick(day)
    }
    
    //标记日期已经选择
	picked() {
		// this.state.picked = true;
	}
    displayDaysPerMonth = (year) => {
        //定义每个月的天数，如果是闰年第二月改为29天
        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            daysInMonth[1] = 29;
        }

        //为了获取一年中每一个月在日历选择器上的数据，
        //从上个月开始，然后是当月，最后是下个月开头的几天

        //daysInPreviousMonth为上一个月的天数
        let daysInPreviousMonth = [].concat(daysInMonth);
        daysInPreviousMonth.unshift(daysInPreviousMonth.pop());

        //获取每一个月显示数据中需要补足上个月的天数
        let addDaysFromPreMonth = new Array(12)
            .fill(null)
            .map((item, index) => {
                let day = new Date(year, index, 1).getDay()
                if (day === 0) {
                    return 6
                } else {
                    return day - 1
                }
            })
        //返回一年中每个月的显示数据，每个数据为6行*7天
        return new Array(12)
            .fill([])
            .map((month, monthIndex) => {
                let addDays = addDaysFromPreMonth[monthIndex],
                    daysCount = daysInMonth[monthIndex],
                    daysCountPrevious = daysInPreviousMonth[monthIndex],
                    monthData = [];
                //补足上一个月
                for (; addDays > 0; addDays--) {
                    monthData.unshift(daysCountPrevious--);
                }
                //添入当前月
                for (let i = 0; i < daysCount;) {
                    monthData.push(++i);
                }
                //补足下一个月
                for (let i = 42 - monthData.length, j = 0; j < i;) {
                    monthData.push(++j);
                }
                return monthData;
            })
    }

    render() {
        // const {actions,calendar} = this.props
        const { calendar: { year, month, day } } = this.props;
        const datePicked = `${year}年${month + 1}月${day}日`;

        let props = {
            viewData: this.displayDaysPerMonth(year),
            datePicked: datePicked,
        }

        return (
            <div styleName='calendar'>
                <p styleName='date-picked'
                    onClick={::this.toogleShow}>
                    {datePicked}</p>
            <div styleName='main' ref='main'>
                <CalendarHeader
                    year={year}
                    month={month}
                    prevMonth={::this.prevMonth}
                    nextMonth = {::this.nextMonth}
                        />
                <CalendarBody
                    {...props}
                    toogleShow ={::this.toogleShow}
                    year={year}
                    month={month}
                    day={day}
                    datePick={::this.datePick}
                    prevMonth={::this.prevMonth}
                    nextMonth = {::this.nextMonth}/>
                <CalendarFooter toogleShow={::this.toogleShow}/>
                </div>
            </div >
        )
    }
}

export default Calendar