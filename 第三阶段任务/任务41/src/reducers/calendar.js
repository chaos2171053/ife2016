import { TOOGLE_SHOW } from '../constants/CalendarActionTypes'
const initialState =
    {
        isShow: false 
    }

const calendar = (state = initialState, action) => {
    switch (action.type) {
        case TOOGLE_SHOW:
            return Object.assign({}, state, {
                isShow: !state.isShow
            })
        default:
            return state
    }
}

export default calendar