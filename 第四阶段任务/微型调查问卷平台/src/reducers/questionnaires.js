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
        {
            username: '666666',
            phonenumber: '18664376937',
            password: '666666',
            questionnaires: [
                {
                    id: 'efa798ab - a1bf - 4410 - b082 - cb8282b002a0',
                    questionnarireTitle: "烧烤味问卷",
                    deadline: 1514801680633,
                    status: "发布中",
                    questions: [
                        {
                            type: "单选题",
                            questionTitle: "台湾九份芋圆哪家好吃？",
                            options: ["阿柑姨家", "赖阿婆家"],
                            isRequired: true
                        },
                        {
                            type: "单选题",
                            questionTitle: "震惊！他来自山村，却成为北上广的精英，退休后守着一座海岛，和心爱的名媛终老。请问，他是谁？",
                            options: ["蒋介石", "张学良"], 
                            isRequired: true
                        },
                        {
                            type: "多选题",
                            questionTitle: "YSL你会买下面",
                            options: ["RV 13# peach passion", "RV 29# rose opera", "RV 33# rose neillia", "RVS 06# pink in devotion", "上面这些我都看不懂 :-D"],
                            isRequired: true
                        },
                        {
                            type: "多选题",
                            questionTitle: "撸串的时候，你必点下面哪些？",
                            options: ["肉串", "土豆片", "韭菜", "秋刀鱼", "鸡翅", "别问了，我饿了。"],
                            isRequired: true
                        },
                        {
                            type: "文本题",
                            questionTitle: "",
                            content: "列出你认为UC震惊部出品标题中，不可缺少的关键词。（如央视曝光、震惊国人、世界沸腾）。",
                            isRequired: true
                        },
                        {
                            type: "文本题",
                            questionTitle: "",
                            content: "编题目好饿，想去撸串。",
                            isRequired: false
                        }
                    ],
                    fillData: [[[0], [0], [1, 2, 3], [1, 0, 2, 3, 4, 5], ["66666"], [""]], [[1], [1], [2, 3], [4, 3, 1, 2, 5], ["666"], [""]], [[1], [1], [0, 1], [0], ["asdfads"], ["asdfasdf3"]], [[0], [1], [0], [1], ["65564654654"], [""]], [[0], [1], [4], [4, 2], ["55"], ["55"]], [[1], [1], [1], [2, 3], ["54564"], [""]], [[0], [0], [], [], ["sdfg"], [""]], [[1], [1], [], [], ["324324"], [""]], [[0], [0], [0], [0], ["555"], [""]], [[0], [0], [2], [2], ["99"], [""]], [[0], [0], [3], [3], ["66"], [""]], [[0], [0], [0, 1, 2], [5], ["66"], [""]], [[1], [1], [4], [4], ["dd"], ["adf"]], [[1], [1], [0], [0, 5], ["5"], ["4"]], [[0], [0], [3], [5], ["asd"], [""]]]
                }]
        },
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