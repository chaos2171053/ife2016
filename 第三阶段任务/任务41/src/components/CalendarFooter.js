import React, { Component,PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './CalendarFooter.scss'
//import  './CalendarFooter.scss'
// @CSSModules(styles)
// class CalendarFooter extends Component {
//     render() {
//         const { toogleShow } = this.props
//         return (
//             <div styleName='footer'>
//                 <button onClick={toogleShow}>
//                     确定
//                 </button>
//             </div>
//         )
//     }
// }
const CalendarFooter = ({ toogleShow }) => (
    <div styleName='footer'>
        <button onClick={toogleShow}>
            确定
        </button>
    </div>
)
CalendarFooter.propTypes = {
    toogleShow:PropTypes.func.isRequired,
}
export default CSSModules(CalendarFooter, styles);