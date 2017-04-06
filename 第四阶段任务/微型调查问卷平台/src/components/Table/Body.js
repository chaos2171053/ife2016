import React, {PropTypes} from 'react';
import styles from './Table.scss'
import classNames from 'classnames'
import { CLOSED, RELEASED,UNRELEASED } from '../../constants/QuestionTypes'
import { message,Popconfirm } from 'antd';
import { Link } from 'react-router-dom'
const Body = ({data,username,deleteQuestionnaire})=>{
    const renderOperate = (value)=>{
        switch (value.status) {
            case CLOSED:
                return (
                    <div>
                        <Link to = {{pathname:'/check',questionnaire:value}}><span>统计</span></Link>
                        <Popconfirm title="确定要删除该问卷吗？" onConfirm={()=>{
                            deleteQuestionnaire(username,value.id)
                            message.success('删除成功');}}  okText="确定" cancelText="取消">
                        <span>删除</span>
                        </Popconfirm>
                    </div>)
            case RELEASED:
                return (
                    <div>
                        <Link to = {{pathname:'/fill',questionnaire:value}}><span>填写</span></Link>
                        <Link to = {{pathname:'/check',questionnaire:value}}><span>统计</span></Link>
                    </div>)
            case UNRELEASED:
                return (
                    <div>
                        <Link to ={{pathname:'/new',questionnaire:value}}><span>编辑</span></Link>
                        <Popconfirm title="确定要删除该问卷吗？" onConfirm={()=>{
                            deleteQuestionnaire(username,value.id)
                            message.success('删除成功');}}  okText="确定" cancelText="取消">
                        <span>删除</span>
                        </Popconfirm>
                    </div>)
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
    username: PropTypes.string.isRequired,
    deleteQuestionnaire:PropTypes.func.isRequired,
    // updateState:PropTypes.func.isRequired,
}
export default Body