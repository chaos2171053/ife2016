import React, {Component,PropTypes} from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarMain from './CalendarMain';
import CalendarFooter from './CalendarFooter'
class Calendar extends Component {
	constructor(props) {
		super(props);
	}

    //切换日期选择器是否显示
	datePickerToggle() {
		debugger;
		this.refs.main.style.height = this.refs.main.style.height === '460px' ? '0px' : '460px';
	}
	
	render() {
		return(
			<div className="output">
			    <div className="star1"></div>
		        <div className="star2"></div>
		        <div className="star3"></div>
		        <p className="datePicked" 
		           onClick = {::this.datePickerToggle}>
		        2017年3月3日
                </p>
                <div className="main" ref = "main">
				    <CalendarHeader/>
				    <CalendarMain/>
					<CalendarFooter datePickerToggle = {::this.datePickerToggle}/>
				</div>
			</div>);
	}

}
export default Calendar;