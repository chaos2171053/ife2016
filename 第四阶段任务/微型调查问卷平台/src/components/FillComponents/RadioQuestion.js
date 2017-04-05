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
        options: PropTypes.array.isRequired
    }

    onChange = (e) => {
        // console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        const { options } = this.props;
        const optionsArray = [];
        const radioStyle = {
            display: 'block',
            height: '2.3rem',
            lineHeight: '2.3rem',
        };
        options.map((option, optionIndex) => {
            optionsArray.push(
                <Radio value={optionIndex} key={optionIndex} style={radioStyle}>{option}</Radio>
            )
        })
        return (
            <RadioGroup onChange={this.onChange} value={this.state.value}>
                {optionsArray}
            </RadioGroup>
        )
    }
}