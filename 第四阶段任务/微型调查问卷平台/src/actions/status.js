import { createAction } from "redux-actions";
import * as types from '../constants/AppStatusActionsTypes'
export const logIn = createAction(types.Log_In) //登录
export const signOut = createAction(types.Sign_Out) //登录