import React, { Component, PropTypes } from 'react';
import styles from './Fill.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FillComponents} from '../../components'
const { Main} = FillComponents
// const mapStateToProps = state => ({
//     username: state.rootReducer.status.username,
// })

// const mapDispatchToProps = dispatch => ({
//     actions: bindActionCreators(Actions, dispatch)
// })

// @connect(mapDispatchToProps)
export default class Fill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // fillData: []//存放填写的问卷数据
        }
    }
    static propTypes = {
        location: React.PropTypes.shape({
            questionnaire: PropTypes.object.isRequired,
        }),

    }
    
    componentWillMount() {
        const { questionnaire:{questions} } = this.props.location;
        let fillData = new Array(questions.length)
        this.setState({
            fillData:fillData
        })
    }

    //处理单选题
    handleRadio(questionIndex,optionIndex){
        let fillData = this.state.fillData;
        fillData[questionIndex] = [optionIndex]; // 把选择的选项索引放入数组中
        this.setState({
            fillData:fillData
        })
        console.log(this.state.fillData)
    }
    render() {
        const { questionnaire } = this.props.location;
        const {questions} = questionnaire;
        return (
            <div className={styles.main}>
                <div className = {styles.header}>
                    <h1>{questionnaire.questionnarireTitle}</h1>
                </div>
                <hr className={styles.hr} />
                <div className = {styles['questions-wrapper']}>
                <Main
                    questions={questions}
                    handleRadio = {::this.handleRadio}
                />
               </div>
            </div>
        )
    }
}