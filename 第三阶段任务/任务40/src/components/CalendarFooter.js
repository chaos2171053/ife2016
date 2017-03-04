import React, {Component,PropTypes} from 'react';
class CalendarFooter extends Component {
	constructor(props) {
		super(props);
	}
	handlePick(){
		this.props.datePickerToggle();
		this.props.picked()
	}
	render() {
		return(
			<div className="calendar-footer">
			    <button onClick = {::this.handlePick}>
			    确定
			    </button>
			</div>
			);
	}

}
export default CalendarFooter ;