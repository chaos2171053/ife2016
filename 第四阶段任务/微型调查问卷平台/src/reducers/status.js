import * as types from '../constants/AppStatusActionsTypes'
import { LOG_IN, SIGN_OUT, RENDER_SIGNIN, RENDER_SIGNUP,ROUTER_LOACTION_CHANGE } from '../constants/AppStatusActionsTypes'

//需要本地存储的数据
// const localState = localStorage.statusState ? JSON.parse(localStorage.statusState) : {
//     isLogin: false,
// }

// const initialState =
//     {
//         ...localState,
//         isRenderSignin: false,
//         isRenderSignup: true,
//     };
const initialState = localStorage.statusState ? JSON.parse(localStorage.statusState) : {
    isLogin: false,
    isRenderSignin: false,
    isRenderSignup: true,
    username:'',
}

// console.log("获取：" + localStorage.statusState)
const status = (state = initialState, action) => {
    // console.log(action)
// debugger
    switch (action.type) {
        case LOG_IN: {//登录
            const state = Object.assign({}, state, {
                isRenderSignin: false,
                isRenderSignup: true,
                isLogin: true,
                username:action.payload.username,
            })
            localStorage.statusState = JSON.stringify(state);
            // console.log("login:   " + localStorage.statusState)
            return state
        }
            break;
        // case SIGN_OUT: {//登出
        //     const state = Object.assign({}, state, {
        //         isRenderSignin: false,
        //         isRenderSignup: true,
        //         isLogin: false
        //     })
        //     localStorage.statusState = JSON.stringify(state);
        //     console.log("logout:   " + localStorage.statusState);
        //     return state
        // }
        //     break;
        case ROUTER_LOACTION_CHANGE: { //路由切换
            if (action.payload.signout === SIGN_OUT) {//登出
                const state = Object.assign({}, state, {
                    isRenderSignin: false,
                    isRenderSignup: true,
                    isLogin: false
                })
                localStorage.statusState = JSON.stringify(state);
                return state
            }else {
                return state;
            }
        }
            break;
        case RENDER_SIGNIN: {
            return Object.assign({}, state, {
                isRenderSignin: true,
                isRenderSignup: false,
            })
        }
            break;
        case RENDER_SIGNUP: {
            return Object.assign({}, state, {
                isRenderSignin: false,
                isRenderSignup: true,
            })
        }
            break;
        default:
            return state
    }
}

export default status