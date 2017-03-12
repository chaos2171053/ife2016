import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './CalendarHeader.scss'

@CSSModules(styles)

class CalendarHeader extends Component {
    render() {
        return (
            <div styleName='header'>
                <span styleName='prev'>《</span>
                <span styleName='next'>》</span>
                <span styleName='date-info'>
                    {this.props.year}年{this.props.month}月
                </span>
            </div>
        )
    }
}

export default CalendarHeader