import React, {Component,PropTypes} from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarMain from './CalendarMain';
import CalendarFooter from './CalendarFooter'
class Calendar extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div className="output">
			    <div className="star1"></div>
		        <div className="star2"></div>
		        <div className="star3"></div>
		        <p className="datePicked">
		        2017年3月3日
                </p>
                <div className="main">
				    <CalendarHeader/>
				    <CalendarMain/>
					<CalendarFooter/>
				</div>
			</div>);
	}

}
export default Calendar;