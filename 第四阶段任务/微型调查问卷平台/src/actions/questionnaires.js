import { createAction } from "redux-actions";
import * as types from '../constants/QuestionnairesActionsTypes'

export const userSignup = createAction(types.USER_SIGNUP,(username,phonenumber,password)=>({username,phonenumber,password})) //显示登录面板
export const saveQuestionnarie = createAction(types.SAVE_QUESTIONNAIRE,(questionnaire,username)=>({questionnaire,username}))