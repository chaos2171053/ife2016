import React, {Component,PropTypes} from 'react';
import TalbeHeader from './TalbeHeader';
import TableBody from './TableBody';
class TableController extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			data:[
			    { name: '金城武', Chinese: 80, Math: 90, English:70,total:240},
				{ name: '吴彦祖', Chinese: 90, Math: 60, English:80,total:230},
				{ name: '张学友', Chinese: 60, Math: 100, English:70,total:230}
			]
		};
	}
	handleSorter(sorter) {
		let data = this.state.data;
		data.sort(sorter);
		this.setState({data:data})
	}
	render() {
		const columns = [{
			title: '姓名', 
			dataIndex: 'name', 
			key:'name',
		},{
			title: '语文', 
			dataIndex: 'Chinese', 
			key:'Chinese',
			asc:(a,b) =>b.Chinese-a.Chinese,
			desc:(a,b) =>a.Chinese-b.Chinese
		},{
			title: '数学', dataIndex: 'Math', key:'Math',
			asc:(a,b) =>b.Math-a.Math,
			desc:(a,b) =>a.Math-b.Math
		},{
			title: '英语', dataIndex: 'English', key:'English',
			asc:(a,b) =>b.English-a.English,
			desc:(a,b) =>a.English-b.Chinese
		},{
			title: '总分', dataIndex: 'total', key:'total',
			asc:(a,b) =>b.total-a.total,
			desc:(a,b) =>a.total-b.total
		}];
		return (
			<table>
			    <TalbeHeader columns = {columns} handleSorter = {this.handleSorter.bind(this)} />
			    <TableBody data= {this.state.data}/>
			</table>
		);
	}

}

export default TableController;