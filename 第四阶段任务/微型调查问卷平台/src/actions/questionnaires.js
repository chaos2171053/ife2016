import { createAction } from "redux-actions";
import * as types from '../constants/QuestionnairesActionsTypes'

export const userSignup = createAction(types.USER_SIGNUP,(username,phonenumber,password)=>({username,phonenumber,password})) //显示登录面板
export const saveQuestionnaire = createAction(types.SAVE_QUESTIONNAIRE,(questionnaire,username)=>({questionnaire,username})) //保存问卷
export const publishQuestionnaire = createAction(types.PUBLISH_QUESTIONNAIRE,(questionnaire,username)=>({questionnaire,username})) //发布问卷
export const closeQuestionnaire = createAction(types.CLOSE_QUESTIONNAIRE,(username,questionnaireIndex)=>({username,questionnaireIndex}))//关闭问卷
export const deleteQuestionnaire = createAction(types.DELETE_QUESTIONNAIRE,(username,questionnaireId)=>({username,questionnaireId})) //删除问卷
export const submitQuestionnaire = createAction(types.SUBMIT_QUESTIONNAIRE,(username,questionnaireId,fillData)=>({username,questionnaireId,fillData}))//提交问卷