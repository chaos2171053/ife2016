import React, { Component, PropTypes } from 'react'

export default class Input extends Component {
    static propTypes = {
        handleEditText:React.PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props)
        this.state = {
            // text: this.props.text || ''
        }
    }

    handleEditText(event,questionIndex,optionIndex){
        // debugger
        this.props.handleEditText(event,questionIndex,optionIndex)
    }

    handleSaveText(event){
        // if (event.type === "keydown" && event.which === 13 || event.type === "blur") {
        //     this.props.handleEditText(event);
        // }
    }
    render() {
        const { className } = this.props;
        return (
            <input
                placeholder={this.props.placeholder}
                autoFocus='true'
                className = {className}
                onChange={::this.handleEditText}
                onKeyDown={::this.handleSaveText}
                onBlur={::this.handleSaveText}
                type='text'/>
        )
    }
}