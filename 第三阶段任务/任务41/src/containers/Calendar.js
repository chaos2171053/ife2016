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

    render() {
        // const {actions,calendar} = this.props
        const { calendar: { year, month, day } } = this.props;
        const datePicked = `${year}年${month + 1}月${day}日`
        return (
            <div styleName='calendar'>
                <p styleName='date-picked'
                    onClick={::this.toogleShow}>
                    {datePicked}</p>
                <div styleName='main' ref='main'>
                    <CalendarHeader />
                    <CalendarBody />
                    <CalendarFooter toogleShow={::this.toogleShow}/>
                </div>
            </div >
        )
    }
}

export default Calendar
// export default CSSModules(Calendar, styles);