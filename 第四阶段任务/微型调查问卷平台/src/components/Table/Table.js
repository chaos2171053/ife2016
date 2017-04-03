import React, {Component,PropTypes} from 'react';
import styles from './Table.scss'
import {cloneObject} from '../../utils/util'
import Header from './Header'
import Body from './Body'
export default class  Table extends Component {
    constructor(props){
        super(props)
        let questionnaires = cloneObject(props.questionnairesArray)
        this.state = {
            questionnaires:questionnaires
        }
    }
    static propTypes = {
        username: PropTypes.string.isRequired,
        questionnairesArray:PropTypes.array.isRequired,
        deleteQuestionnaire:PropTypes.func.isRequired,
    }

    // updateState(){
    //     let questionnaires = cloneObject(this.props.questionnairesArray)
    //     this.setState({questionnaires:questionnaires})
    // }

    // componentWillReceiveProps(nextProps) {
    //     let questionnaires = cloneObject(nextProps)
    //     this.setState({
    //         text: nextProps.text
    //     });
    // }

    //把时间戳处理成年-月-日
    componentWillMount() {
        let questionnaires = cloneObject(this.props.questionnairesArray)
        questionnaires.map ((q,index)=>{
            const time = new Date(q.deadline)
            const [year,month,day,hour,mintues] = [time.getFullYear(), time.getMonth() + 1, time.getDate(),time.getHours(),time.getMinutes()];
            if(q.deadline === 0){
                q.timeFormat = `未选择`
            }else{
            q.timeFormat = `${year}-${month}-${day} ${hour}:${mintues}`
            }
        })
        this.setState({questionnaires:questionnaires})
    }
    render() {
        const {username,deleteQuestionnaire} = this.props;
        // console.log(this.props.questionnairesArray)
        const columns = [{
            title:'标题',
            dataIndex: 'questionnairetitle', 
			key:'title',
        },{
            title:'截止日期',
            dataIndex:'deadline',
            key:'deadline',
            asc:(a,b) =>b.deadline-a.deadline,
			desc:(a,b) =>a.deadline-b.deadline
        },{
            title:'状态',
            dataIndex:'status',
            key:'status'
        },{
            title:'操作',
            dataIndex:'operate',
            key:'operate'
        },]
        return(
            <table className = {styles.table}>
                <Header columns = {columns}/>
                <Body
                    username = {username}
                    deleteQuestionnaire = {deleteQuestionnaire}
                    data = {this.state.questionnaires}/>
            </table>
        )
    }

}