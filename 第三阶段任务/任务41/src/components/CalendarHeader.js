import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './CalendarHeader.scss'

// @CSSModules(styles)

// class CalendarHeader extends Component {
//     render() {

//         return (
//             <div styleName='header'>
//                 <span styleName='prev' onClick={this.props.prevMonth}>《</span>
//                 <span styleName='next' onClick={this.props.nextMonth}>》</span>
//                 <span styleName='date-info'>
//                     {this.props.year}年{this.props.month}月
//                 </span>
//             </div>
//         )
//     }
// }
//export default CalendarHeader
const CalendarHeader = ({prevMonth, nextMonth, year, month}) => (
    <div styleName='header'>
        <span styleName='prev' onClick={prevMonth}>《</span>
        <span styleName='next' onClick={nextMonth}>》</span>
        <span styleName='date-info'>
            {year}年{month+1}月
        </span>
    </div>
)

CalendarHeader.propTypes = {
    prevMonth:PropTypes.func.isRequired,
    nextMonth:PropTypes.func.isRequired,
    year:PropTypes.number.isRequired,
    month:PropTypes.number.isRequired
}
export default CSSModules(CalendarHeader, styles);