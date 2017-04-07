import React, { Component, PropTypes } from 'react';
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar');
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');

export default class PictorialBar extends Component {
    constructor(props) {
        super(props);
        this.setPieOption = this.setPieOption.bind(this);
    }

    static propTypes = {
        barData: React.PropTypes.string.isRequired,
        // barData:React.PropTypes.array.isRequired,
    }
    setPieOption(barData) {
        let xMax = 100;
        return {
            tooltip: {
                show: true,
                formatter: "{b} {c}"
            },
            grid: {
                // left: '15%',
                // top: '5%',
                // bottom: '0',
                // right: '0'
            },
            legend: {
                orient: 'horizontal',
                bottom: 'bottom',
                data: ['123'],
            },
            xAxis: [
                {
                    max: xMax,
                    type: 'value',
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    data: [''],
                    nameTextStyle: {
                        color: '#b7ce9e',
                        fontSize: '18px'
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    }
                }
            ],
            series: [
                {
                    name: ' ',
                    type: 'bar',
                    barWidth: 25,
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{c}%',
                        }
                    },
                    data: [{
                        value: barData,
                        itemStyle: {
                            normal: { color: '#80cbc4' }
                        }
                    },
                    ],
                }
            ]
        };
    }

    componentDidMount() {
        let myChart = echarts.init(this.refs.pictorialBar)
        let { barData } = this.props;
        let chartOptions = this.setPieOption(barData)
        myChart.setOption(chartOptions)
    }
    render() {
        return (
            <div>
                <div ref='pictorialBar' style={{ width: '100%', height: '100%', margin: '0 auto' }}></div>
            </div>
        )
    }
}