import React, {PropTypes} from 'react';
import styles from './Table.scss'
import classNames from 'classnames'
import { CLOSED, RELEASED,UNRELEASED } from '../../constants/QuestionTypes'
const Body = ({data})=>{
    const renderOperate = (value)=>{

        switch (value.status) {
            case CLOSED:
                return (<div><span>统计</span><span>删除</span></div>)
            case RELEASED:
                return (<div><span>填写</span><span>统计</span></div>)
            case UNRELEASED:
                return (<div><span>编辑</span><span>删除</span></div>)
            default:
                break;
        }
    }
    return (
        <tbody>{
            data.map((value,index)=>
            <tr key = {value.id}>
                <td>{value.questionnarireTitle}</td>
                <td>{value.timeFormat}</td>
                <td 
                    className = {classNames(
                        {[styles['status-closed']]:value.status === CLOSED,
                         [styles['status-released']]:value.status === RELEASED,})}>{value.status}</td>
                <td>{renderOperate(value)}</td>
		     </tr>)}
        </tbody>
		);
}
Body.propTypes = {
    data:PropTypes.array.isRequired,
}
export default Body