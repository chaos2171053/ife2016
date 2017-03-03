import React, {Component,PropTypes} from 'react';
class CalendarMain extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<table className = "calendar-main">
			    <thead>
			        <tr>
			            <th>日</th>
			            <th>一</th>
			            <th>二</th>
			            <th>三</th>
			            <th>四</th>
			            <th>五</th>
			            <th>六</th>
			        </tr>
			    </thead>
			    <tbody>
			        <tr>
			            <td>1</td>
			            <td>2</td>
			            <td>3</td>
			            <td>4</td>
			            <td>5</td>
			            <td>6</td>
			            <td>7</td>
			        </tr>
			    </tbody>
			</table>);
	}

}
export default CalendarMain ;