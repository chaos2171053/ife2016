import React from 'react';
import styles from '../styles/App.css';
class TalbeHeader extends React.Component {
	render() {
		return (
			<thead>
				<tr>
				    <th className = {styles.header}>
				        姓名
				        <div className = "ant-table-column-sorter">
				            <span className = "ant-table-column-sorter-up" title="up">
				                <i className ="anticon anticon-caret-up"></i>
				            </span>
				        </div>
				    </th>
				     <th className = {styles.header}>
				        语文
				        <div class = {styles.sorter}></div>
				    </th>
				     <th className = {styles.header}>
				        数学
				        <div class = {styles.sorter}></div>
				    </th>
				    <th className = {styles.header}>
				        英语
				        <div class = {styles.sorter}></div>
				    </th>
				    <th className = {styles.header}>
				        总分
				        <div class = {styles.sorter}></div>
				    </th>
				</tr>
			</thead>
		);
	}

}

export default TalbeHeader;