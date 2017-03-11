import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './CalendarFooter.scss'
@CSSModules(styles)
class CalendarFooter extends Component {
    render() {
        return (
            <div styleName='footer'>
                <button>
                    确定
                </button>
            </div>
        )
    }
}


export default CalendarFooter