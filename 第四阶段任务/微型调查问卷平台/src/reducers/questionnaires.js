import * as types from '../constants/QuestionnairesActionsTypes'
import {  } from '../constants/QuestionnairesActionsTypes'
import { userModel, questionnaireModel, questionModel } from '../data/data'

//需要本地存储的数据
const dataBase = localStorage.dataBase  ? JSON.parse(localStorage.dataBase ) :
    [
        {
            username: 'chaos', // 用户名
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

const questionnaire = (state = dataBase , action) => {
    switch (action.type) {
        
        default:
            return state
    }
}
const questionnaires = (state = dataBase, action) => {
    
    switch (action.type) {
        
        default:
            return state
    }
}
export default questionnaires