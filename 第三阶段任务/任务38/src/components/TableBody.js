import React from 'react';
import styles from '../styles/App.css';
class TableBody extends React.Component {
	render() {
		return (
			<tbody>
			    <tr>
			        <td className = {styles.td}>小明</td>
			        <td className = {styles.td}>80</td>
			        <td className = {styles.td}>90</td>
			        <td className = {styles.td}>70</td>
			        <td className = {styles.td}>240</td>
			    </tr>
			    <tr>
			        <td className = {styles.td}>小红</td>
			        <td className = {styles.td}>90</td>
			        <td className = {styles.td}>60</td>
			        <td className = {styles.td}>80</td>
			        <td className = {styles.td}>230</td>
			    </tr>
			</tbody>
		);
	}

}

export default TableBody;