import React, {Component,PropTypes} from 'react';
import styles from '../styles/App.css';
class TalbeHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	static propTypes = {
		columns:React.PropTypes.arrayOf(React.PropTypes.shape({
			title:React.PropTypes.string.isRequired,
			dataIndex:React.PropTypes.string.isRequired,
			key:React.PropTypes.string.isRequired,
			asc:React.PropTypes.func,
			desc:React.PropTypes.func,
		})),
		handleSorter:React.PropTypes.func
	};

	upDate(e,sorter) {
		this.props.handleSorter(sorter);	
	}
	render() {
		let content = [];
		this.props.columns.map((value,index)=>{
		    if(value.asc || value.desc){
		    	content.push(
				<th key = {index}>{value.title}
					<span className={styles.desc} onClick = {(e)=>this.upDate(e,value.desc)}></span>
					<span className={styles.asc} onClick = {(e)=>this.upDate(e,value.asc)}></span>
				</th>);
		    }else{
		    	content.push(
		    	<th key = {index}>{value.title}
		    	</th>);
		    }
		});
		return (
			<thead>
				<tr>{content}</tr>
			</thead>
		);
	}

}

export default TalbeHeader;