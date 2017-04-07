import React, { PropTypes } from 'react';
import styles from './Table.scss'
// import { Link } from 'react-router-dom'
const Header = ({ columns,handleSorter }) => {
    let content = [];
    const upDate = (e,sorter)=>{
        handleSorter(sorter)
    }
    columns.map((value, index) => {
        if (value.asc || value.desc) {
            content.push(
                <th key={index}>
                    <span>
                        {value.title}
                        <div className = {styles['sorter-wrpper']}>
                            <span 
                                className={styles.desc}
                                onClick = {(e)=>upDate(e,value.desc)}
                                ><i className={styles.iconfont}>&#xf034d;</i></span>
                            <span 
                                className={styles.asc}
                                onClick = {(e)=>upDate(e,value.asc)}><i className={styles.iconfont}>&#xf034e;</i></span>
                        </div>
                    </span>
                </th>);
        }
        else {
            content.push(
                <th key={index}><span>{value.title}</span></th>);
        }
    })
    return (
        <thead>
            <tr>{content}</tr>
        </thead>
    );
}
Header.propTypes = {
    columns: PropTypes.array.isRequired,
    handleSorter :PropTypes.func.isRequired,
}
export default Header