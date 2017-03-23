import { createAction } from "redux-actions";
import * as types from '../constants/QuestionnairesActionsTypes'
export const checkUsernameRepeat = createAction(types.USERNAME_REPEAT,username=>username) //检查用户名是否重复