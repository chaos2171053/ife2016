import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './CalendarBody.scss'
@CSSModules(styles)
class CalendarBody extends Component {
    render() {
        return (
            <table styleName = 'body'>
                <thead>
                    <tr>
                        <th>日</th>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        )
    }
}

export default CalendarBody