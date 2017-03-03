import React from 'react';
import styles from '../styles/App.css';
class TableBody extends React.Component {
	constructor(props) {
		super(props);
	}
	static propTypes = {
		data: React.PropTypes.arrayOf(React.PropTypes.shape({
			name: React.PropTypes.string,
			Chinese: React.PropTypes.number,
			Math:React.PropTypes.number,
			English:React.PropTypes.number,
			total:React.PropTypes.number
		})).isRequired
	}
	render() {
		let content = [];
		this.props.data.map((value,index)=>{
			content.push(
				<tr key = {index}>
				    <td className = {styles.td}>{value.name}</td>
				    <td className = {styles.td}>{value.Chinese}</td>
				    <td className = {styles.td}>{value.Math}</td>
				    <td className = {styles.td}>{value.English}</td>
				    <td className = {styles.td}>{value.total}</td>
				</tr>
			);
		});
		return (
			<tbody>{content}</tbody>
		);
	}

}

export default TableBody;