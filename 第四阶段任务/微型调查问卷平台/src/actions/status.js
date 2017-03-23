import { createAction } from "redux-actions";
import * as types from '../constants/AppStatusActionsTypes'
export const logIn = createAction(types.LOG_IN) //登录
export const signOut = createAction(types.SIGN_OUT) //登录
export const renderSignin = createAction(types.RENDER_SIGNIN) //显示登录面板
export const renderSignup = createAction(types.RENDER_SIGNUP) //显示登录面板