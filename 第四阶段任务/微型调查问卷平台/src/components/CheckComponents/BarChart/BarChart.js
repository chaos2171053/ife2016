import React, { Component, PropTypes } from 'react';
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar');
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');

export default class PieChart extends Component {
    constructor(props) {
        super(props);
        this.setPieOption = this.setPieOption.bind(this);
    }

    static propTypes = {
        options: React.PropTypes.array.isRequired,
        barData:React.PropTypes.array.isRequired,
    }
    setPieOption(options, barData) {
        return {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            // legend: {
            //     data: options,
            // },
            xAxis: [
                {
                    type: 'category',
                    data: options,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '人数',
                    type: 'bar',
                    // barWidth: '60%',
                    data: barData,
                }
            ]
        };
    }

    componentDidMount() {
        let myChart = echarts.init(this.refs.barChart)
        let { options, barData } = this.props;
        let chartOptions = this.setPieOption(options, barData)
        myChart.setOption(chartOptions)
    }
    render() {
        return (
            <div>
                <div ref='barChart' style={{ width: '100%', height: '250%', margin: '0 auto' }}></div>
            </div>
        )
    }
}