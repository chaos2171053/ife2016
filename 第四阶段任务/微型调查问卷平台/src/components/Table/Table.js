import React, {Component,PropTypes} from 'react';
import styles from './Table.scss'
export default class  Table extends Component {
    constructor(props){
        super(props)
        this.state = {
            questionnaires:this.props.questionnairesArray
        }
    }

    //把时间戳处理成年-月-日
    componentWillMount() {
        let questionnaires = this.props.questionnairesArray
        questionnaires.map ((q,index)=>{
            const time = new Date(q.deadline)
            const [year,month,date] = [time.getFullYear(), time.getMonth() + 1, time.getDate()];
            q.dealine = `${year}-${month}-${date}`
        })
    }
    static propTypes = {
        questionnairesArray:PropTypes.array.isRequired
    }
    render() {
        console.log(this.state.questionnaires)
        return(
            <div className = {styles.table}>table</div>
        )
    }

}