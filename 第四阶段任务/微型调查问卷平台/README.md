# 问啊
在自学前端完成百度前端学院2016第四阶段任务中，在任务要求的基础上，实现的一个微型问卷调查平台。

## Introdution

* [任务要求](http://ife.baidu.com/2016/task/detail?taskId=50)
* [遇到的问题及解决方法](https://github.com/chaos2171053/ife2016)
* [在线 demo](http://t.cn/RXwk86g)
* 手机查看 ↓ 二维码 ↓
    
    ![问啊](QRCode.png)


* **登录注册**

    模仿了知乎的登录注册页面，使用canvas做背景动画，做了简单的用户信息校验。

* **首页**

    可以对问卷的截止日期进行排序，对问卷编辑、查看统计、填写；<br>
    当一个问卷都没有的时候，表格不展现，显示新建问卷按钮。
    
* **新增问卷**

    可以对问卷中的问题进行增删改操作，对问题的位置进行位置改变（上移、下移），对问题复用；<br>
    可以对单选、多选题中的选项进行增删改排序；<br>
    文本题可以设定是必填还是非必填的问题；<br>
    每张问卷有一个截止日期，不早于现在；<br>
    问卷可以保存或发布。

* **编辑问卷**

    可以对未发布的问卷进行编辑。

* **发布问卷**

    可以发布已创建好的问卷。

* **填写问卷**

    可以填写问卷。

* **查看统计**

    可以查看问卷的填写情况。

## Technology Stack
- React
- React-Redux
- React-Router
- ES6
- Canvas
- antd
- Sass
- CSS Modules
- classnams
- moment
- uuid 
- ECharts
- ReactCSSTransitionGroup


## Details

* **数据存储**

    以 JSON 形式存储于 LocalStorage 中
    
```
[{用户1},{用户2},{用户3}...]

//用户1如下所示
{
    username: '666666', // 用户名
    phonenumber: '18612345678', // 手机号
    password: '666666', // 密码
    questionnaires: [   // 问卷数组
        { 
            id: '',    // 每个问卷的id，使用了uuid生成唯一的id
            questionnaireTitle: '',     // 该问卷的标题
            deadline: '',   // 该问卷的截止日期
            status: '',    // 问卷的状态
            fillData:[ //存放用户填写问卷的数据
                        [[问题1选择或填写的内容]],[问题2选择或填写的内容]],//第一次填写问卷的数据
                        [第二次填写...],[第三次],[..]....
                    ] //
            questions: [ // 问题数组 
                {
                    type: '', // 该问题的类型 有单选、多选、文本题三种类型
                    questionTitle: '', // 该问题的标题
                    options: [], // 该问题的选项
                    isRequired: true, // 是否必填 默认必填
                    content: '', // 如果该问题是文本题，存放文本题的题目
                },
            ]
        },
    ]
}
```

* **封装可复用组件**
    
    封装了Input、Table等组件可多次复用。
    新增问卷、编辑问卷等为拥有本地状态的组件，使用内部state，使store不那么庞大，更容易维护。

* **使用 `Sass` ,`CSS Modules`,`classnams`处理 CSS 代码**
    
    使用分块、继承等方式，使得代码更加清晰明了。

* **响应式布局**
    
    针对手机端细节做了很多调整，更符合手机上的视觉交互习惯。

* **前端工程化**
    
    使用了webpack。


