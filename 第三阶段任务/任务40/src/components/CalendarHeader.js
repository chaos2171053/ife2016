import React, {Component,PropTypes} from 'react';
class CalendarHeader extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div className = "calendar-header">
			    <span className = "prev" 
			          onClick = {this.props.prevMonth}>
			    《
			    </span>
			    <span className = "next"
			          onClick = {this.props.nextMonth}>
			    》
			    </span>
			    <span className="date-info">
                    {this.props.year}年{this.props.month + 1}月
                </span>
			</div>);
	}

}
export default CalendarHeader ;