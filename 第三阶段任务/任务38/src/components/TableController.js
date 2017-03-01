import React from 'react';
import TalbeHeader from './TalbeHeader';
import TableBody from './TableBody';
class TableController extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// };
	}
	static props
	render() {
		const columns = [{
			title: '姓名', dataIndex: 'name', key:'name'
		},{
			title: '语文', dataIndex: 'Chinese', key:'Chinese'
		},{
			title: '数学', dataIndex: 'Math', key:'Math'
		},{
			title: '英语', dataIndex: 'English', key:'English'
		},{
			title: '总分', dataIndex: 'total', key:'total'
		}];
		const data = [
			{ name: '小明', Chinese: 80, Math: 90, English:70,total:240},
			{ name: '小红', Chinese: 90, Math: 60, English:80,total:230},
			{ name: '小亮', Chinese: 60, Math: 100, English:70,total:230}
		];
		return (
			<table>
			    <TalbeHeader columns = {columns} />
			    <TableBody data= {data}/>
			</table>
		);
	}

}

export default TableController;