export let defaultUser = {
    username: "666666",
    phonenumber: "18664376937",
    password: "666666",
    questionnaires:
    [{
        id: "6589e796-6d26-4aeb-b880-1cfb3ffb7e96",
        questionnarireTitle: "关于撸串的问卷",
        deadline: 1514735999805,
        status: "发布中",
        questions: [
            {
                type: "单选题",
                questionTitle: "上一次撸串是什么时候",
                options: ["昨天", "前天", "上周", "忘了"],
                isRequired: true
            },
            {
                type: "多选题",
                questionTitle: "现在想撸串吗",
                options: ["想啊", "当然啊", "这不废话吗"],
                isRequired: true
            },
            {
                type: "多选题",
                questionTitle: "如果现在去撸串，你会请我吗",
                options: ["不会", "想得美", "怎么可能！", "你太天真了"],
                isRequired: true
            },
            {
                type: "多选题",
                questionTitle: "撸串必点下面哪些？",
                options: ["鸡翅", "韭菜", "秋刀鱼", "肉串", "茄子", "啤酒"],
                isRequired: true
            },
            {
                type: "多选题",
                questionTitle: "撸串要加哪些调料",
                options: ["辣椒", "孜然粉", "椒盐", "黑胡椒粉"],
                isRequired: true
            },
            {
                type: "多选题",
                questionTitle: "你饿了吗",
                options: ["饿", "好饿", "真的饿"],
                isRequired: true
            },
            {
                type: "单选题",
                questionTitle: "那我再问一次，请我撸串吗？",
                options: ["好啊", "不不不"],
                isRequired: true
            },
            {
                type: "文本题",
                questionTitle: "",
                content: "请参照《舌尖上的中国》写一篇不少于1个字的撸串经历",
                isRequired: true
            },
            {
                type: "文本题",
                questionTitle: "",
                content: "编题目编得我好饿啊",
                isRequired: false
            }],
        fillData: [[[3], [1], [3, 2, 0, 1], [1, 0, 3, 2, 4, 5], [3, 0, 2, 1], [0, 1, 2], [1], ["6"], ["6"]], [[1], [0], [0, 1, 2], [0, 1, 2, 3, 4], [2, 1], [1], [1], ["8"], [""]], [[3], [2, 1], [3], [5, 3, 4], [2, 3], [2, 1], [1], ["6"], [""]], [[1], [0], [0], [1], [1, 0], [0, 1], [0], ["6"], ["6"]], [[1], [0, 1, 2], [2, 1], [2, 1], [2, 1], [2, 1], [1], ["88"], [""]], [[0], [1], [1], [1, 2], [2, 1], [2], [1], ["6"], [""]], [[0], [1], [1, 3], [4, 5], [3, 2], [2], [1], ["6"], [""]], [[2], [1], [1, 2], [3], [1], [1], [1], ["6"], [""]], [[2], [1], [2, 1], [1, 2], [1, 2], [2, 1], [1], ["6"], [""]], [[0], [1, 2], [2, 1], [1], [2, 1], [1], [1], ["66"], [""]], [[0], [1, 0], [0], [1], [1], [0], [1], ["988"], ["52"]], [[2], [1, 0], [1], [3], [0], [2], [1], ["66"], [""]], [[2], [1, 0], [2], [3, 1], [1], [1], [0], ["666"], ["5"]], [[3], [0, 1], [1], [0, 1], [1], [1], [1], ["66"], [""]], [[3], [2], [2], [3, 5], [0], [0], [1], ["6"], [""]], [[3], [1], [2], [3], [1, 2], [2, 1], [1], ["6"], [""]], [[3], [1], [2], [2, 3], [0, 2, 1], [2], [1], ["6"], [""]], [[3], [2], [3], [3, 2], [3], [2], [1], ["5"], [""]], [[2], [2, 1], [2, 1], [3, 2], [0], [1], [1], ["6"], ["5"]]]
    },
    {
        id: "8c592f85-1fa9-46ca-ae42-536a1a771d69",
        questionnarireTitle: "关于这个 问啊",
        deadline: 0,
        status: "未发布",
        questions: [
            {
                type: "单选题",
                questionTitle: "你可以发布问卷",
                options: ["A", "B"],
                isRequired: true
            },
            {
                type: "多选题",
                questionTitle:"也可以保存问卷",
                options: ["1", "2"],
                isRequired: true
            },
            {
                type: "单选题",
                questionTitle: "可以复用题目，就像这样",
                options: ["1", "2"],
                isRequired: true
            },
            {
                type: "单选题",
                questionTitle: "可以复用题目，就像这样",
                options: ["1", "2"],
                isRequired: true
            },
            {
                type: "文本题",
                questionTitle: "",
                content: "也可以对题目进行排序，添加、删除选项",
                isRequired: true
            },
            {
                type: "文本题",
                questionTitle: "",
                content: "也可以设置是否必填",
                isRequired: false
            },
            {
                type: "文本题",
                questionTitle: "",
                content: "-基于react，react-redux，react-router编写。\n-使用sass，CSS Modules，classnams；\n-动画用了canvas， ReactCSSTransitionGroup；\n-采用了蚂蚁金服的部分组件，图表展示使用了Echarts，",
                isRequired: true
            }],
        fillData: []
    },
    {
        id: "3069cfd3-cdeb-4b0f-a49f-1f92428c2f26",
        questionnarireTitle: "我们去撸串吧",
        deadline: 1491624000666,
        status: "发布中",
        questions: [
            {
                type: "单选题",
                questionTitle: "皮皮虾我们走",
                options: ["go", "gogogo"],
                isRequired: true
            }],
        fillData: [[[0]], [[1]]]
    }]
}