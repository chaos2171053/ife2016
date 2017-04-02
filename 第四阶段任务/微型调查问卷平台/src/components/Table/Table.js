import React, {Component,PropTypes} from 'react';
import styles from './Table.scss'
import {cloneObject} from '../../utils/util'
export default class  Table extends Component {
    constructor(props){
        super(props)
        let questionnaires = cloneObject(this.props.questionnairesArray)
        this.state = {
            questionnaires:questionnaires
        }
    }

    //把时间戳处理成年-月-日
    componentWillMount() {
        let questionnaires = cloneObject(this.props.questionnairesArray)
        questionnaires.map ((q,index)=>{
            const time = new Date(q.deadline)
            const [year,month,day,hour,mintues] = [time.getFullYear(), time.getMonth() + 1, time.getDate(),time.getHours(),time.getMinutes()];
            q.timeFormat = `${year}-${month}-${day} ${hour}:${mintues}`
        })
        this.setState({questionnaires:questionnaires})
    }
    static propTypes = {
        questionnairesArray:PropTypes.array.isRequired
    }
    render() {
        console.log(this.props.questionnairesArray)
        return(
            <div className = {styles.table}>table</div>
        )
    }

}