import React, { Component, PropTypes } from 'react';

//导入echarts
var echarts = require('echarts/lib/echarts') //必须
require('echarts/lib/chart/pie') //图表类型
require('echarts/lib/component/title') //标题插件
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');

export default class PieChart extends Component {
    constructor(props) {
        super(props);
        this.setPieOption = this.setPieOption.bind(this);
    }

    static propTypes = {
            pieData: React.PropTypes.array.isRequired,
            options: React.PropTypes.array.isRequired,
            // questionIndex: React.PropTypes.number,
            // questionTitle: React.PropTypes.string,
            // questionType: React.PropTypes.string
    }

    componentDidMount() {
        let myChart = echarts.init(this.refs.pieReact)
        let data = this.props;
        let options = this.setPieOption(data)
        myChart.setOption(options)
    }



    render() {
        return (
            <div>
                <div ref="pieReact" style={{ width: '100%', height: '250%', margin: '0 auto' }}></div>
            </div>
        )
    }

    //一个基本的echarts图表配置函数
    setPieOption(data) {
        return {
            // title: {
            //     // text: `Q${data.questionIndex + 1} ${data.questionTitle}`,
            //     subtext: '饼图',
            //     x: 'center'
            // },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                bottom: 'bottom',
                data: data.options,
            },
            series: [
                {
                    name: '人数',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: data.pieData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    lableLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                }
            ]
        };
    }
}