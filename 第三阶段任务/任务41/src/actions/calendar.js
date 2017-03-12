import * as types from '../constants/CalendarActionTypes'
//是否显示日历控件
export const toogleShow = () => ({ 
    type: types.TOOGLE_SHOW 
})
//切换上一个月
export const previousMonth = (month) =>({
    type:types.PREVIOUS_MONTH,
    month
})
//切换上一个月
export const nextMonth = (month) =>({
    type:types.NEXT_MONTH,
    month
})
