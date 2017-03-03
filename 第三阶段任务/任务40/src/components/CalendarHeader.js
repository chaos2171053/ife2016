import React, {Component,PropTypes} from 'react';
class CalendarHeader extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div className = "calendar-header">
			    <span className = "prev">
			    《
			    </span>
			    <span className = "next">
			    》
			    </span>
			    <span className="date-info">
                    2017年3月
                </span>
			</div>);
	}

}
export default CalendarHeader ;