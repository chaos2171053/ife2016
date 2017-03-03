import React, {Component,PropTypes} from 'react';
class CalendarFooter extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div className="calendar-footer">
			    <button onClick = {this.props.datePickerToggle}>
			    确定
			    </button>
			</div>
			);
	}

}
export default CalendarFooter ;