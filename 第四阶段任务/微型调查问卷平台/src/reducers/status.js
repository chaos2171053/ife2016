import * as types from '../constants/AppStatusActionsTypes'
import { LOG_IN, SIGN_OUT,RENDER_SIGNIN,RENDER_SIGNUP } from '../constants/AppStatusActionsTypes'

//需要本地存储的数据
const localState = localStorage.statusState ? JSON.parse(localStorage.statusState): {
     isLogin: false,
}

const initialState =  
{ 
    ...localState,
    isRenderSignin:false,
    isRenderSignup:true,
};

const status = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {//登录状态
            const state = Object.assign({}, state, {
                isRenderSignin:true,
                isRenderSignup:false,
                isLogin: true
            })
            localStorage.statusState = JSON.stringify(state);
            return state
        }
            break;
        case SIGN_OUT: {//登出状态
            const state = Object.assign({}, state, {
                isRenderSignin:false,
                isRenderSignup:true,
                isLogin: false
            })
            localStorage.statusState = JSON.stringify(state);
            return state
        }
            break;
        case RENDER_SIGNIN:{
            return Object.assign({}, state, {
                isRenderSignin:true,
                isRenderSignup:false,
            })
        }
        break;
        case RENDER_SIGNUP:{
            return Object.assign({}, state, {
                isRenderSignin:false,
                isRenderSignup:true,
            })
        }
        break;
        default:
            return state
    }
}

export default status