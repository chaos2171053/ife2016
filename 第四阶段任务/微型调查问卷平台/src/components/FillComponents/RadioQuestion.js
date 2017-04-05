import React, { PropTypes, Component } from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

export default class RadioQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // value: 0,
        }
    }
    static PropTypes = {
        options: PropTypes.array.isRequired,
        handleRadio:PropTypes.func.isRequired,
        questionIndex:PropTypes.number.isRequired,
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
        this.props.handleRadio(e.target.questionIndex,e.target.value);
    }

    render() {
        const { options,questionIndex } = this.props;
        const optionsArray = [];
        const radioStyle = {
            display: 'block',
            // height: '2.3rem',
            // lineHeight: '2.3rem',
            marginTop:'1rem',
        };
        options.map((option, optionIndex) => {
            optionsArray.push(
                <Radio 
                     value={optionIndex} 
                     key={optionIndex} 
                     style={radioStyle} 
                     questionIndex = {questionIndex}>
                     {option}
                </Radio>
            )
        })
        return (
            <RadioGroup onChange={this.onChange} value={this.state.value}>
                {optionsArray}
            </RadioGroup>
        )
    }
}