import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './CalendarBody.scss'
@CSSModules(styles)
class CalendarBody extends Component {


    //处理日期选择时间，如果是当月，触发日期选择；
    //如果不是当月，切换月份
    handleDatePick(index, styleName) {
        debugger
        switch (styleName) {
            case 'thisMonth':
                let month = this.props.viewData[this.props.month];
                this.props.datePick(month[index]);
                break;
            case 'prev-month':
                this.props.prevMonth();
                break;
            case 'next-month':
                this.props.nextMonth();
                break;
        }
    }


    //处理选择是选中的样式效果
    //利用闭包保存上一次选择的元素，
    //在月份切换和重新选择日期是重置上一次选择的元素样式
    changeColor() {
        let previousEl = null;
        return function (event) {
            let name = event.target.nodeName.toLocaleLowerCase();
            if (previousEl && (name === 'i' || name === 'td')) {
                previousEl.style = '';
            }
            if (event.target.className === 'thisMonth') {
                event.target.style = 'background:#F8F8F8;color:#000';
                previousEl = event.target;
            }
        }

    }
    //绑定颜色改变事件
    componentDidMount() {
        let changeColor = this.changeColor()
        document.getElementById('app')
            .addEventListener('click', changeColor, false);
    }
    render() {
        //确定当前月数据中每一天所属的月份，以此赋予不同className
        let month = this.props.viewData[this.props.month],
            rowsInMonth = [],
            i = 0,
            styleOfDays = (() => {
                let i = month.indexOf(1),
                    j = month.indexOf(1, i + 1),
                    arr = new Array(42);
                arr.fill('prev-month', 0, i)
                arr.fill('thisMonth', i, j)
                arr.fill('next-month', j)
                return arr;
            })();
        //把每一个月的显示数据以7天为一组等分
        month.forEach((day, index) => {
            if (index % 7 === 0) {
                rowsInMonth.push(month.slice(index, index + 7))

            }
        })
        return (
            <table styleName='body'>
                <thead>
                    <tr>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                        <th>日</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rowsInMonth.map((row, rowIndex) => {
                            return (
                                <tr key={rowIndex}>
                                    {
                                        row.map((day) => {
                                            return (
                                                <td className={`${styleOfDays[i]}`}
                                                    onClick={
                                                        this.handleDatePick.bind
                                                            (this, i, styleOfDays[i])}
                                                    key={i++}>
                                                    {day}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}

export default CalendarBody