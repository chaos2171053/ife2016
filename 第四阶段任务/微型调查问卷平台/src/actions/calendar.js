import * as types from '../constants/CalendarActionTypes'
import { createAction } from "redux-actions";

//切换上一个月
// export const previousMonth = (month) =>({
//     type:types.PREVIOUS_MONTH,
//     month
// })
//切换上一个月
export const nextMonth = (month) =>({
    type:types.NEXT_MONTH,
    month
})

//选择日期
export const datePick = (day) =>({
    type:types.DATE_PICK,
    day
})

//标记日期已经选择
export const picked = () =>({
    type:types.DATE_PICKED
})

export const previousMonth = createAction(types.PREVIOUS_MONTH,(month)=>({month}))