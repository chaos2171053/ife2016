import React, {PropTypes} from 'react';
import styles from './Table.scss'
import { Link } from 'react-router-dom'
const Header = ({columns})=>{
    let content = [];
    columns.map((value,index)=>{
        if(value.asc || value.desc){
            content.push(
                <th key = {index}><span>{value.title}</span>
					<span className={styles.desc}></span>
					<span className={styles.asc}></span>
				</th>);
		    }
            else{
                content.push(
                    <th key = {index}><span>{value.title}</span></th>);
		    }
    })
    return (
			<thead>
				<tr>{content}</tr>
			</thead>
		);
}
Header.propTypes = {
    columns:PropTypes.array.isRequired,
}
export default Header