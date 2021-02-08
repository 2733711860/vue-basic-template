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
		<div class="page-one">
			<div class="weayher-detail">
				<div class="temp" v-if="weatherObj">{{weatherObj.tem}}°</div>
				<div class="address" v-if="weatherObj">{{weatherObj.city}} · {{weatherObj.wea}}</div>
				<div class="address" v-if="weatherObj">{{weatherObj.week}}</div>
			</div>
			<div class="one-word">{{oneWord}}</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		weatherObj: {
			type: [String, Object],
			default: ""
		},
		oneWord: {
			type: String,
			default: ''
		}
	},
	
	computed: {
		picUrl() {
			let bgUrl = require(`@/assets/img/weather/bg.jpg`);
			return `url(${bgUrl})`
		},
	},
	
	methods: {
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
		.page-one{
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20px;
			.one-word{
				writing-mode: vertical-rl;
				height: 300px;
				line-height: 40px;
				text-align: center;
				font-size: 19px;
				letter-spacing: 5px;
				font-family: cursive;
			}
			.weayher-detail{
				.temp{
					font-size: 80px;
					font-family: 'Times New Roman', Times, serif;
				}
				.address{
					font-size: 20px;
					font-family: cursive;
					line-height: 30px;
				}
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
