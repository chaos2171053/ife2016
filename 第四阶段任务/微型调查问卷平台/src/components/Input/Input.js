import React, { Component, PropTypes } from 'react'

export default class Input extends Component {
    static propTypes = {
        value: React.PropTypes.string,
        placeholder: React.PropTypes.string.isRequired,
        handleEditText:React.PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props)
    }

    handleEditText(event,questionIndex,optionIndex){
        this.props.handleEditText(event,questionIndex,optionIndex)
    }

    handleSaveText(event,questionIndex,optionIndex){
        if (event.type === "keydown" && event.which === 13 || event.type === "blur") {
            this.props.handleEditText(event,questionIndex,optionIndex);
        }
    }
    render() {
        const { className} = this.props;
        return (
            <input
                placeholder={this.props.placeholder}
                value={this.props.value}
                className = {className}
                onChange={::this.handleEditText}
                onKeyDown={::this.handleSaveText}
                onBlur={::this.handleSaveText}
                type='text'/>
        )
    }
}