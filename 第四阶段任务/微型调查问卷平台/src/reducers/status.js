import * as types from '../constants/AppStatusActionsTypes'
import { Log_In, Sign_Out } from '../constants/AppStatusActionsTypes'

const initialState = localStorage.statusState ? JSON.parse(localStorage.statusState) : { isLogin: false };

const status = (state = initialState, action) => {
    switch (action.type) {
        case Log_In: {
            const state = Object.assign({}, state, {
                isLogin: true
            })
            localStorage.statusState = JSON.stringify(state);
            return state
        }
            break;
        case Sign_Out: {
            const state = Object.assign({}, state, {
                isLogin: false
            })
            localStorage.statusState = JSON.stringify(state);
            return state
        }
            break;

        default:
            return state
    }
}

export default status