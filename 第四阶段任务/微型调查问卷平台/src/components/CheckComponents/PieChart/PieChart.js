import React, { Component, PropTypes } from 'react';

//导入echarts
var echarts = require('echarts/lib/echarts') //必须
require('echarts/lib/chart/pie') //图表类型
require('echarts/lib/component/title') //标题插件
// require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');

export default class PieChart extends Component {

    constructor(props) {
        super(props);
        this.setPieOption = this.setPieOption.bind(this);
    }

    static propTypes = {
        data: PropTypes.shape({
            dataPie: React.PropTypes.array,
            questionIndex: React.PropTypes.number,
            questionTitle:React.PropTypes.string,
            questionType:React.PropTypes.string
        }),
    }

    componentDidMount() {
        let myChart = echarts.init(this.refs.pieReact)
        let data = this.props;
        let options = this.setPieOption(data)
        myChart.setOption(options)
    }



    render() {
        return (
            <div className="pie-react">
                <div ref="pieReact" style={{ width: "100%", height: "300%" }}></div>
            </div>
        )
    }

    //一个基本的echarts图表配置函数
    setPieOption(data) {
        return {
            title: {
                text: `Q${data.questionIndex + 1} ${data.questionTitle}`,
                subtext: data.questionType,
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left',
            //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            // },
            series: [
                {
                    name: '选项',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: data.dataPie,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    }
}