import { TOOGLE_SHOW, PREVIOUS_MONTH, NEXT_MONTH } from '../constants/CalendarActionTypes'
const initialState =
    {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        isShow: false
    }

const calendar = (state = initialState, action) => {
    switch (action.type) {
        case TOOGLE_SHOW:
            return Object.assign({}, state, {
                isShow: !state.isShow
            })
            break;
        case PREVIOUS_MONTH:
            {
                if (action.month == 0) {
                    return Object.assign({}, state, {
                        year: --state.year,
                        month: 11
                    })
                }
                else {
                    return Object.assign({}, state, {
                        month: --state.month
                    })
                }
            }
            break
        case NEXT_MONTH:
            {
                if (action.month === 11) {
                    return Object.assign({}, state, {
                        year: ++state.year,
                        month: 0
                    })
                } else {
                    return Object.assign({},state,{
                        month:++state.month
                    })
                }
            }
        default:
            return state
    }
}

export default calendar