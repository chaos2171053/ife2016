import {
    USER_SIGNUP, SAVE_QUESTIONNAIRE,
    PUBLISH_QUESTIONNAIRE, CLOSE_QUESTIONNAIRE, DELETE_QUESTIONNAIRE,SUBMIT_QUESTIONNAIRE
} from '../constants/QuestionnairesActionsTypes'
import { UNRELEASED, RELEASED, CLOSED } from '../constants/QuestionTypes'
import { userModel, questionnaireModel, questionModel } from '../data/data'
import { v4 } from 'node-uuid';
import { cloneObject } from '../utils/util'
//需要本地存储的数据
const dataBase = localStorage.dataBase ? JSON.parse(localStorage.dataBase) :
    [
        // {
        //     username: 'chaos666', // 用户名
        //     phonenumber: '18664376937', // 手机号
        //     password: '666666', // 密码
        //     questionnaires: [
        //         //{ // 问卷数组
        //         //     id: '',// 每个问卷的id
        //         //     questionnaireTitle: '', // 该问卷的标题
        //         //     deadline: '', // 该问卷的截止日期
        //         //     status: '', // 问卷的状态
        //         //     fillData:[ //存放用户填写问卷的数据
        //         //     [[问题1选择或填写的内容]],[问题2选择或填写的内容]],//填写的第一份问卷
        //         //      [第二次填写的问卷...],[第三次],[..]....
        //         //     ] //
        //         //     questions: [ // 问题数组 
        //         //         {
        //         //             type: '', // 问题类型
        //         //             questionTitle: '', // 问题标题
        //         //             options: [], // 问题选项
        //         //             isRequired: true, // 是否必填 默认必填
        //         //             content: '', // 文本题题目
        //         //         },
        //         //     ]

        //         // },
        //     ]
        // },
    ];
//每个用户表
const questionnaire = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNUP: { //用户注册
            const { username, phonenumber, password } = action.payload;
            return {
                username: username,
                phonenumber: phonenumber,
                password: password,
                questionnaires: []
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
                state.questionnaires.forEach((q, index) => {
                    if (q.id === questionnaire.id) {
                        state.questionnaires.splice(index, 1, questionnaire);
                    }
                })
            }
            return state
        }
            break;
        case PUBLISH_QUESTIONNAIRE: { // 发布问卷
            const { questionnaire } = action.payload
            questionnaire.status = RELEASED;
            if (questionnaire.id === -1) { //如果问卷之前没有创建过，
                questionnaire.id = v4() //赋予一个独一的id
                state.questionnaires.push(questionnaire)
            } else { //发布之前保存的问卷
                state.questionnaires.forEach((q, index) => {
                    if (q.id === questionnaire.id) {
                        state.questionnaires.splice(index, 1, questionnaire);
                    }
                })
            }
            return state;
        }
            break;
        case CLOSE_QUESTIONNAIRE: { // 关闭问卷
            const questionnaireIndex = action.payload.questionnaireIndex
            state.questionnaires.map((q, index) => {
                if (index === questionnaireIndex) {
                    q.status = CLOSED
                }
            })
            return state
        }
            break
        //删除问卷
        case DELETE_QUESTIONNAIRE: {
            const questionnaireId = action.payload.questionnaireId
            state.questionnaires.map((q, index) => {
                if (q.id === questionnaireId) {
                    state.questionnaires.splice(index, 1);
                }
            })
            return state

        }
            return state
        case SUBMIT_QUESTIONNAIRE: { // 提交问卷
            const questionnaireId = action.payload.questionnaireId;
            const fillData = action.payload.fillData;
            state.questionnaires.map((q, index) => {
                if (q.id === questionnaireId) {
                    state.questionnaires[index].fillData.push(fillData);
                    console.log(state.questionnaires[index])
                }
            })
            return state
        }
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

        //保存问卷
        case SAVE_QUESTIONNAIRE:

        //发布问卷
        case PUBLISH_QUESTIONNAIRE:

        //关闭问卷
        case CLOSE_QUESTIONNAIRE:

        //提交问卷
        case SUBMIT_QUESTIONNAIRE:

        //删除问卷
        case DELETE_QUESTIONNAIRE:
            {
                const { username } = action.payload
                let newState = cloneObject(state);
                newState.map((user) => {
                    if (user.username === username) {
                        questionnaire(user, action)
                    }
                })
                localStorage.dataBase = JSON.stringify(newState);
                return newState
            }
            break;
        default:
            return state
    }
}
export default questionnaires