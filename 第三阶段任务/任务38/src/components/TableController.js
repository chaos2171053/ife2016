import React from 'react';
import TalbeHeader from './TalbeHeader';
import TableBody from './TableBody';
class Table extends React.Component {
	render() {
		return (
			<table>
			    <TalbeHeader/>
			    <TableBody/>
			</table>
		);
	}

}

export default Table;