import echarts from 'echarts'

export const airEchartFunc = (myChart, params) => {
	var colorSet = {
		color: '#468EFD'
	};
	var option = {
		tooltip: {
			formatter: "{a} <br/>{b} : {c}%"
		},

		series: [
			{
				name: "内部进度条",
				type: "gauge",
				// center: ['50%', '50%'],
				radius: '54%',
				z: 4,
				splitNumber: 5,
				axisLine: {
					lineStyle: {
						color: [
							[params.value / params.max, new echarts.graphic.LinearGradient(
								0, 1, 0, 0, [{
										offset: 0,
										color: 'rgba(0,191,194,.1)',
									}, {
										offset: 0.5,
										color: 'rgba(0,191,194,0.4)',
									},
									{
										offset: 1,
										color: 'rgba(0,191,194,0.8)',
									}
								]
							)],
							[
								1, 'rgba(28,128,245,.0)'
							]
						],
						width: 170
					}
				},
				axisLabel: {
					show: false,
				},
				axisTick: {
					show: false,

				},
				splitLine: {
					show: false,
				},
				itemStyle: {
					show: false,
				},
				detail: {
					formatter: function(value) {
						return params.text;
					},
					offsetCenter: [0, -75],
					textStyle: {
						padding: [0, 0, 0, 0],
						fontSize: 15,
						color: "rgba(255, 255, 255, 1)"
					}
				},
				title: { //标题
					show: true,
					offsetCenter: [0, 46], // x, y，单位px
					textStyle: {
						color: "rgba(46, 143, 255, 1)",
						fontSize: 15, //表盘上的标题文字大小
						fontWeight: 550,
						fontFamily: 'PingFangSC'
					}
				},
				data: [{
					name: params.value,
					value: params.value * (100 / params.max),
				}],
				itemStyle: {
					normal: {
						color: 'rgba(46, 143, 255, 1)'
					}
				},
				pointer: {
					show: true,
					length: '80%',
					radius: '20%',
					width: 3, //指针粗细
				},
				animationDuration: 4000,
			},
			{
				name: '外部刻度',
				type: 'gauge',
				//  center: ['20%', '50%'],
				radius: '60%',
				min: 0, //最小刻度
				max: params.max, //最大刻度
				splitNumber: 10, //刻度数量
				startAngle: 225,
				endAngle: -45,
				axisLine: {
					show: false,
					lineStyle: {
						width: 1,
						color: [
							[1, 'rgba(0,0,0,0)']
						]
					}
				}, //仪表盘轴线
				axisLabel: {
					show: true,
					color: 'rgba(255,255,255,.5)',
					fontSize: 10,
					distance: 0,
					formatter: function(v) {
						switch (v + '') {
							case '0':
								return '0';
							case (params.max + ''):
								return params.max + '';
						}
					}
				}, //刻度标签。
				axisTick: {
					show: true,
					splitNumber: 7,
					lineStyle: {
						color: '#42E5FB', //用颜色渐变函数不起作用
						width: 2,
					},
					length: 8
				}, //刻度样式
				splitLine: {
					show: true,
					length: 15,
					lineStyle: {
						color: '#42E5FB', //用颜色渐变函数不起作用
					}
				}, //分隔线样式
				detail: {
					show: false
				},
				pointer: {
					show: true
				}
			},
		]
	};

	myChart.setOption(option);
}
