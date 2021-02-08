<template>
	<div class="weather-page" :style="{ backgroundImage: picUrl }">
		<van-nav-bar  left-arrow @click-left="$router.go(-1)">
			<template #title>
				<span @click="changeCity">
					{{weatherObj ? weatherObj.city : '天气'}}
					<i class="iconfont icon-location-outline"></i>
				</span>
			</template>
		</van-nav-bar>
		<div class="page-two">
			<div class="line-one">{{weatherObj ? weatherObj.tem : '10'}}°</div>
			<div class="line-two">
				<span>{{weatherObj ? weatherObj.tem1 : '15'}}°</span>/
				<span>{{weatherObj ? weatherObj.tem2 : '10'}}°</span>
			</div>
			<div class="line-three">
				<span>{{weatherObj ? weatherObj.wea : '晴'}}</span> - <span>{{weatherObj ? weatherObj.air_level : '空气良'}}</span>
			</div>
			
			<div class="item-module first-module">
				<div class="top">24小时预报</div>
				<div class="detail scroll-wrap">
					<div class="item-hour" v-for="(item, index) in hourWeatherList" :key="index">
						<div class="time">{{item.hours}}</div>
						<i class="iconfont" :class="['icon-' + item.wea_img]"></i>
						<div class="time">{{item.tem}}℃</div>
					</div>
				</div>
			</div>
			
			<div class="item-module">
				<div class="top">多天预报</div>
				<div class="detail-two">
					<div class="item-day" v-for="(item, index) in sevenWeatherList" :key="index + 'seven'">
						<div class="time">{{item.day}}</div>
						<i class="iconfont" :class="['icon-' + item.wea_img]"></i>
						<div class="time">{{item.tem1}}℃ / {{item.tem2}}℃</div>
					</div>
				</div>
			</div>
			
			<div class="item-module">
				<div class="top">空气质量</div>
				<div class="detail-three">
					<div id="airEchart"></div>
					<div class="air-detail">
						<div class="item-level">
							<span>PM10</span>
							<span>{{aqiObj ? aqiObj.pm10 : ''}}</span>
							<span>{{aqiObj ? aqiObj.pm10_desc : ''}}</span>
						</div>
						<div class="item-level">
							<span>PM2.5</span>
							<span>{{aqiObj ? aqiObj.pm25 : ''}}</span>
							<span>{{aqiObj ? aqiObj.pm25_desc : ''}}</span>
						</div>
						<div class="item-level">
							<span>NO2</span>
							<span>{{aqiObj ? aqiObj.no2 : ''}}</span>
							<span>{{aqiObj ? aqiObj.no2_desc : ''}}</span>
						</div>
						<div class="item-level">
							<span>SO2</span>
							<span>{{aqiObj ? aqiObj.so2 : ''}}</span>
							<span>{{aqiObj ? aqiObj.so2_desc : ''}}</span>
						</div>
						<div class="item-level">
							<span>O3</span>
							<span>{{aqiObj ? aqiObj.o3 : ''}}</span>
							<span>{{aqiObj ? aqiObj.o3_desc : ''}}</span>
						</div>
						<div class="item-level">
							<span>CO</span>
							<span>{{aqiObj ? aqiObj.co : ''}}</span>
							<span>{{aqiObj ? aqiObj.co_desc : ''}}</span>
						</div>
					</div>
				</div>
			</div>
			
			<div class="item-module">
				<div class="top">舒适度</div>
				<div class="detail-four">
					<div id="comfEchart"></div>
					<div class="life-tips">
						<div class="item-tip" v-for="(item, index) in comfList" :key="index + 'comf'">
							<div class="left">{{item.title}}</div>
							<div>{{item.level}}</div>
							<div @click="showTips(item)">生活小贴士</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="item-module">
				<div class="top">风向风力</div>
				<div class="detail-three">
					<wind-mill></wind-mill>
					<div class="air-detail">
						<div class="item-level-two">
							<span>风向</span>
							<span>{{windObj ? windObj.win[0] : ''}}</span>
						</div>
						<div class="item-level-two">
							<span>风力等级</span>
							<span>{{windObj ? windObj.win_speed : ''}}</span>
						</div>
						<div class="item-level-two">
							<span>风速</span>
							<span>{{windObj ? windObj.win_meter : ''}}</span>
						</div>
					</div>
				</div>
			</div>
			
			<div class="updateTime">更新时间：{{update_time}}</div>
		</div>
		
		<life-tip v-model="show" :windObj="windObj" :tipsDetail="tipsDetail"></life-tip>
	</div>
</template>

<script>
import { airEchartFunc } from '@/components/weather/echart-option/index.js';
import windMill from '@/components/weather/windMill.vue';
import lifeTip from '@/components/weather/life-tip.vue';
export default {
	components: {
		windMill, lifeTip
	},
	
	data() {
		return {
			show: false,
			tipsDetail: ''
		}
	},
	
	props: {
		weatherObj: {
			type: [String, Object],
			default: ""
		},
		sevenWeather: {
			type: [String, Object],
			default: ""
		}
	},
	
	computed: {
		picUrl() {
			let bgUrl = require(`@/assets/img/weather/bg.jpg`);
			return `url(${bgUrl})`
		},
		hourWeatherList() {
			return this.sevenWeather && this.sevenWeather.data ? this.sevenWeather.data[0].hours : []
		},
		sevenWeatherList() {
			return this.sevenWeather ? this.sevenWeather.data : []
		},
		windObj() {
			return this.sevenWeather && this.sevenWeather.data ? this.sevenWeather.data[0] : ''
		},
		aqiObj() {
			return this.sevenWeather ? this.sevenWeather.aqi : ''
		},
		update_time() {
			return this.sevenWeather ? this.sevenWeather.update_time : ''
		},
		comfList() {
			return this.sevenWeather ? this.sevenWeather.data[0].index : []
		}
	},
	
	watch: {
		sevenWeather() {
			if (this.sevenWeather) {
				this.drawLine('airEchart', this.aqiObj);
				this.drawTwoLine('comfEchart', this.sevenWeather);
			}
		}
	},
	
	methods: {
		drawLine(id, airObj) {
			let myChart = this.$echarts.init(document.getElementById(id));
			airEchartFunc(myChart, {
				max: 500,
				value: Number(airObj.air),
				text: '污染指数'
			})
		},
		
		drawTwoLine(id, conObj) {
			let myChart = this.$echarts.init(document.getElementById(id));
			airEchartFunc(myChart, {
				max: 100,
				value: Number(conObj.data[0].humidity.replace("%", "")),
				text: '空气湿度'
			})
		},
		
		showTips(item) {
			this.tipsDetail = item;
			this.show = true;
		},
		
		changeCity() {
			this.$emit('chooseCity')
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.weather-page{
		height: 100%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		.page-two{
			flex: 1;
			overflow-y: auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			.line-one{
				font-size: 65px;
				font-family: 'Times New Roman', Times, serif;
				margin-top: 20px;
			}
			.line-two, .line-three{
				line-height: 30px;
			}
			
			.first-module{
				margin-top: 40px !important;
			}
			.item-module{
				width: 350px;
				padding: 0 10px;
				margin-top: 10px;
				background-color: rgba(255, 255, 255, .2);
				border-radius: 5px;
				.top{
					padding: 8px 10px;
					border-bottom: 1PX solid #d8d8d8;
				}
				.detail{
					display: flex;
					overflow-x: auto;
					width: 100%;
					.item-hour{
						display: flex;
						flex-direction: column;
						align-items: center;
						padding: 5px 0;
						div{
							width: 80px;
							font-size: 13px;
							font-family: cursive;
							line-height: 30px;
							text-align: center;
							color: #FFFFFF;
						}
						.iconfont{
							font-size: 20px;
							margin: 10px 0;
						}
					}
				}
				.detail-two{
					width: 100%;
					.item-day{
						display: flex;
						justify-content: space-between;
						color: #FFFFFF;
						font-size: 13px;
						line-height: 50px;
						font-family: cursive;
					}
					.time{
						width: 30%;
						text-align: right;
					}
				}
				.detail-three{
					display: flex;
					#airEchart{
						width: 180px;
						height: 180px;
					}
					.air-detail{
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: center;
						.item-level, .item-level-two{
							display: flex;
							justify-content: space-between;
							color: #FFFFFF;
							font-size: 14px;
							font-family: cursive;
							line-height: 30px;
							span:first-child{
								color: #c6c6c6;
								width: 33% !important;
							}
							span{
								width: 27%;
								text-align: center;
							}
							span:last-child{
								width: 40% !important;
							}
						}
						.item-level-two{
							span:first-child{
								width: 40%;
							}
							span:last-child{
								width: 60%;
							}
						}
					}
				}
				.detail-four{
					#comfEchart{
						width: 100%;
						height: 180px;
					}
					.life-tips{
						.item-tip{
							display: flex;
							justify-content: space-between;
							color: #FFFFFF;
							font-size: 14px;
							font-family: cursive;
							line-height: 30px;
							div:first-child{
								width: 40%;
							}
							div:last-child{
								color: #468EFD;
							}
						}
					}
				}
			}
			.updateTime{
				width: 100%;
				padding: 10px 20px 30px 20px;
				color: #c6c6c6;
				font-size: 13px;
				font-family: cursive;
			}
		}
	}
</style>

<style lang="less">
	.weather-page{
		.van-nav-bar {
			background: initial;
			.van-nav-bar__text, .van-icon, .van-nav-bar__title{
				color: #FFFFFF;
			}
		}
		.van-hairline--bottom::after{
			border: none;
		}
	}
</style>
