import React, {PropTypes} from 'react';
import styles from './Table.scss'
const Body = ({data})=>{
    let content = [];
    console.log(data)
    data.map((value,index)=>{
        content.push(
        <tr key = {value.id}>
            <td className = {styles.td}>{value.questionnarireTitle}</td>
            <td className = {styles.td}>{value.timeFormat}</td>
            <td className = {styles.td}>{value.status}</td>
            <td></td>
		</tr>);
    })
    return (
        <tbody>{content}</tbody>
		);
}
Body.propTypes = {
    data:PropTypes.array.isRequired,
}
export default Body