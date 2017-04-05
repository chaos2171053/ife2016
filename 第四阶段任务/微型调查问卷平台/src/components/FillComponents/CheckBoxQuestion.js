import React, { PropTypes} from 'react';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

const CheckBoxQuestion =({questionIndex,options,handleCheckBox})=> {
    const onChange=(checkedValues) =>{
        // console.log('checked = ', checkedValues);
        handleCheckBox(questionIndex,checkedValues)
    }

    const data = [];
    options.map((option,optionIndex)=>{
        data.push({
            label: option, value: optionIndex
        })
    })
    return (
        <CheckboxGroup options={data} onChange={onChange}></CheckboxGroup>
    )
}
CheckBoxQuestion.propTypes = {
    questionIndex:PropTypes.number.isRequired,
    options:PropTypes.array.isRequired,
    handleCheckBox:PropTypes.func.isRequired,
}
export default CheckBoxQuestion