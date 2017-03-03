import React, {Component,PropTypes} from 'react';
import TalbeHeader from './TalbeHeader';
import TableBody from './TableBody';
import ReactDOM from 'react-dom';
class TableController extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			data:[
			    { name: '金城武', Chinese: 80, Math: 90, English:70,total:240},
				{ name: '吴彦祖', Chinese: 90, Math: 60, English:80,total:230},
				{ name: '张学友', Chinese: 60, Math: 100, English:70,total:230},
				{ name: '金城武', Chinese: 80, Math: 90, English:70,total:240},
				{ name: '吴彦祖', Chinese: 90, Math: 60, English:80,total:230},
				{ name: '张学友', Chinese: 60, Math: 100, English:70,total:230},
				{ name: '金城武', Chinese: 80, Math: 90, English:70,total:240},
				{ name: '吴彦祖', Chinese: 90, Math: 60, English:80,total:230},
				{ name: '张学友', Chinese: 60, Math: 100, English:70,total:230},
				{ name: '金城武', Chinese: 80, Math: 90, English:70,total:240},
				{ name: '吴彦祖', Chinese: 90, Math: 60, English:80,total:230},
				{ name: '张学友', Chinese: 60, Math: 100, English:70,total:230},
				{ name: '金城武', Chinese: 80, Math: 90, English:70,total:240},
				{ name: '吴彦祖', Chinese: 90, Math: 60, English:80,total:230},
				{ name: '张学友', Chinese: 60, Math: 100, English:70,total:230},
				{ name: '张学友', Chinese: 60, Math: 100, English:70,total:230},
				{ name: '金城武', Chinese: 80, Math: 90, English:70,total:240},
				{ name: '吴彦祖', Chinese: 90, Math: 60, English:80,total:230},
				{ name: '张学友', Chinese: 60, Math: 100, English:70,total:230},
				{ name: '金城武', Chinese: 80, Math: 90, English:70,total:240},
				{ name: '吴彦祖', Chinese: 90, Math: 60, English:80,total:230},
				{ name: '张学友', Chinese: 60, Math: 100, English:70,total:230},
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
    handleScroll() {
		let headerDOM = ReactDOM.findDOMNode(this.refs.tHeader),
		    tableDOM = ReactDOM.findDOMNode(this.refs.table),
		    top = tableDOM.offsetTop,
		    height = tableDOM.clientHeight + top;
		    debugger;
		if (window.scrollY > top) {
			headerDOM .style.position = "fixed";
			headerDOM .style.zIndex = "999";
			headerDOM .style.top = 0;
			if (window.scrollY > height) {
				headerDOM .style.position = "absolute";
			}
		} else {
			headerDOM .style.position = "static";
		}
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll.bind(this));
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
			desc:(a,b) =>a.English-b.English
		},{
			title: '总分', dataIndex: 'total', key:'total',
			asc:(a,b) =>b.total-a.total,
			desc:(a,b) =>a.total-b.total
		}];
		return (
			<table ref = "table">
			    <TalbeHeader columns = {columns} handleSorter = {this.handleSorter.bind(this)} ref = "tHeader"/>
			    <TableBody data= {this.state.data} ref = "tBody"/>
			</table>
		);
	}

}

export default TableController;