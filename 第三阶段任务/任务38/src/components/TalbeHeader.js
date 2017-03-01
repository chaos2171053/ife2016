import React from 'react';
import styles from '../styles/App.css';
class TalbeHeader extends React.Component {
	constructor(props) {
		super(props);
		this.handleDesc = this.handleDesc.bind(this);
		this.handleAsc = this.handleAsc.bind(this)
	}
	static propTypes = {
		columns:React.PropTypes.array.isRequired
	};
	handleDesc(){
		alert('wa1');
	}
	handleAsc(){
		alert('wa2');
	}
	render() {
		let content = [];
		this.props.columns.forEach((value,index)=>{
			content.push(
				<th key = {index}>{value.title}
					<span className={styles.desc} onClick = {this.handleDesc}></span>
					<span className={styles.asc} onClick = {this.handleAsc}></span>
				</th>);
		    });
		return (
			<thead>
				<tr>{content}</tr>
			</thead>
		);
	}

}

export default TalbeHeader;