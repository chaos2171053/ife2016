import React from 'react';
import styles from '../styles/App.css';
class TalbeHeader extends React.Component {
	render() {
		return (
			<thead>
				<tr>
				    <th>
				        姓名
				    </th>
				    <th>
				        语文
				        <span className={styles.desc}></span>
				        <span className={styles.asc}></span>
				    </th>
				    <th>
				        数学
				        <span className={styles.desc}></span>
				        <span className={styles.asc}></span>
				    </th>
				    <th>
				        英语
				        <span className={styles.desc}></span>
				        <span className={styles.asc}></span>
				    </th>
				    <th>
				        总分
				        <span className={styles.desc}></span>
				        <span className={styles.asc}></span>
				    </th>
				</tr>
			</thead>
		);
	}

}

export default TalbeHeader;