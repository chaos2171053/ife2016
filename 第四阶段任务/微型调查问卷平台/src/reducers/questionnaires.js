import * as types from '../constants/QuestionnairesActionsTypes'
import { USER_SIGNUP, SAVE_QUESTIONNAIRE, PUBLISH_QUESTIONNAIRE } from '../constants/QuestionnairesActionsTypes'
import {UNRELEASED,RELEASED,CLOSED} from '../constants/QuestionTypes'
import { userModel, questionnaireModel, questionModel } from '../data/data'
import { v4 } from 'node-uuid';
//需要本地存储的数据
const dataBase = localStorage.dataBase ? JSON.parse(localStorage.dataBase) :
    [
        {
            username: 'chaos666', // 用户名
            phonenumber: '18664376937', // 手机号
            password: '666666', // 密码
            questionnaires: [{ // 问卷数组
                id: '',// 每个问卷的id
                questionnaireTitle: '', // 该问卷的标题
                deadline: '', // 该问卷的截止日期
                status: '', // 问卷的状态
                questions: [ // 问题数组 
                    {
                        type: '', // 问题类型
                        questionTitle: '', // 问题标题
                        options: [], // 问题选项
                        isRequired: false, // 是否必填 默认不必填
                        content: '', // 文本题 
                    },
                ]

            },]
        },
    ];
// const initialState = {
//     dataBase,
// }
// const initialState = [
//     // {
//     //     username: '', // 用户名
//     //     phonenumber: '', // 手机号
//     //     password: '', // 密码
//     //     questionnaires: [{ // 问卷数组
//     //         questionnaireTitle: '', // 该问卷的标题
//     //         deadline: '', // 该问卷的截止日期
//     //         status: '', // 问卷的状态
//     //         questions: [ // 问题数组 
//     //             {
//     //                 type: '', // 问题类型
//     //                 questionTitle: '', // 问题标题
//     //                 options: [], // 问题选项
//     //                 isRequired: false, // 是否必填 默认不必填
//     //                 content: '', // 文本题 
//     //             },
//     //         ]

//     //     },]
//     // },
// ]

const questionnaire = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNUP: { //用户注册
            const { username, phonenumber, password } = action.payload;
            return {
                username: username,
                phonenumber: phonenumber,
                password: password,
                questionnaires:[]
            }
        }
            break;
        case SAVE_QUESTIONNAIRE: { //保存问卷
            const { questionnaire } = action.payload
            questionnaire.status = UNRELEASED;
            if (questionnaire.id === -1) { //如果问卷之前没有创建过，
                questionnaire.id = v4() //赋予一个独一的id              
                state.questionnaires.push(questionnaire);
            } else { //编辑之前保存的问卷
                state.questionnaires.forEach((q,index)=>{
                    if(q.id === questionnaire.id){
                        state.questionnaires.splice(index,1,questionnaire);
                    }
                })
            }
            return state
        }
            break;
        case PUBLISH_QUESTIONNAIRE: { // 发布问卷
            const { questionnaire } = action.payload
            questionnaire.status =RELEASED;
            if (questionnaire.id === -1) { //如果问卷之前没有创建过，
                questionnaire.id = v4() //赋予一个独一的id
                state.questionnaires.push(questionnaire)
            } else { //发布之前保存的问卷
                state.questionnaires.forEach((q,index)=>{
                    if(q.id === questionnaire.id ){
                        state.questionnaires.splice(index,1,questionnaire);
                    }
                })
            }
            return state;
        }
            break;
        default:
            return state
    }
}

const questionnaires = (state = dataBase, action) => {
    switch (action.type) {
        case USER_SIGNUP: { //用户注册
            state = [
                ...state,
                questionnaire(undefined, action)
            ]
            localStorage.dataBase = JSON.stringify(state);
            return state
        }
            break;
        case SAVE_QUESTIONNAIRE: { //保存问卷
            const { username } = action.payload
            state.map((user) => {
                if (user.username === username) {
                    questionnaire(user, action)
                }
            })
            localStorage.dataBase = JSON.stringify(state);
            return state
        }
            break;
        case PUBLISH_QUESTIONNAIRE: { //发布问卷
            const { username } = action.payload
            state.map((user) => {
                if (user.username === username) {
                    questionnaire(user, action)
                }
            })
            localStorage.dataBase = JSON.stringify(state);
            return state
        }
            break;
        default:
            return state
    }
}
export default questionnaires