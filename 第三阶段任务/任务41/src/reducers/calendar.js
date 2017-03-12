import { PREVIOUS_MONTH, NEXT_MONTH,DATE_PICK ,DATE_PICKED} from '../constants/CalendarActionTypes'
const initialState =
    {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        isShow: false,
        picked:false
    }

const calendar = (state = initialState, action) => {
    switch (action.type) {
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
            break
        case DATE_PICK:
            return Object.assign({},state,{
               day:action.day
           })
           break
        case DATE_PICKED:
            return Object.assign({},state,{
                picked:true
            })
            
        default:
            return state
    }
}

export default calendar