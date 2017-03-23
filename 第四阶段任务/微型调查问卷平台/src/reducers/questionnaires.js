import * as types from '../constants/QuestionnairesActionsTypes'
import { USERNAME_REPEAT } from '../constants/QuestionnairesActionsTypes'
import { userModel, questionnaireModel, questionModel } from '../data/data'

//需要本地存储的数据
const dataBase = localStorage.dataBase ? JSON.parse(localStorage.dataBase) :
    [
        {
            username: '', // 用户名
            phonenumber: '', // 手机号
            password: '', // 密码
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
const initialState = {
    dataBase,
    isUsernameRepeat: false
}
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
        case USERNAME_REPEAT: {
            if (action.username === state.username) {
                return Object.assign()
            }
        }
            break;
        default:
            return state
    }
}
const questionnaires = (state = initialState, action) => {
    debugger
    let { dataBase, isUsernameRepeat } = state
    switch (action.type) {
        case USERNAME_REPEAT: {
            dataBase.forEach(data => {
                if (data.username === action.payload) {
                    state = object.assign({}, state, {
                        ...state,
                        isUsernameRepeat: true
                    })
                }
            })
            return state
        }
            break;
        default:
            return state
    }
}
export default questionnaires