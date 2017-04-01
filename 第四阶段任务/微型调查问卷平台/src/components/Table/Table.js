import React, {Component,PropTypes} from 'react';
import styles from './Table.scss'
export default class  Table extends Component {
    constructor(props){
        super(props)
        this.state = {
            questionnairesArray:this.props.questionnairesArray
        }
    }
    static propTypes = {
        questionnairesArray:PropTypes.array.isRequired
    }
    render() {
        // console.log(this.state.questionnairesArray)
        return(
            <div className = {styles.table}>table</div>
        )
    }

}