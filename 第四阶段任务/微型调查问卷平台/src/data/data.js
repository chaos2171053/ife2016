//用户模板
export const userModel = {
    username: '', // 用户名
    phonenumber: '', // 手机号
    password: '', // 密码
    questionnaires: [],// 问卷数组
}

//问卷模板
export const questionnaireModel = {
    id:'',// 每个问卷的id
    questionnaireTitle: '', // 该问卷的标题
    deadline: '', // 该问卷的截止日期
    status: '', // 问卷的状态
    questions: [ // 问题数组 
    ]
}

//问题模板
export const questionModel = {
    type: '', // 问题类型
    questionTitle: '', // 问题标题
    options: [], // 问题选项
    isRequired: false, // 是否必填 默认不必填
    content: '', // 文本题 
}