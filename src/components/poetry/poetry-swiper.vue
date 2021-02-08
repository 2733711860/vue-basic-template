<template>
	<div class="poetry-swipe" :style="{ backgroundImage: picUrl }">
		<div class="content">
			<van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)">
				<template #right>
					<van-icon name="ellipsis" size="18" @click="rightClick" />
				</template>
			</van-nav-bar>
			<div>{{currentData ? currentData.type : ''}}</div>
		</div>
		
		<div class="mask"></div>
	</div>
</template>

<script>
import { randomNum } from '@/utils';
export default {
	computed: {
		picUrl() {
			let bgUrl = `http://qnmfzc41w.hn-bkt.clouddn.com/mwd-picture-${randomNum(31, 60)}.jpg` ?
				`http://qnmfzc41w.hn-bkt.clouddn.com/mwd-picture-${randomNum(31, 60)}.jpg` :
				require(`@/assets/img/weather/bg.jpg`);
			return `url(${bgUrl})`
		},
	},
	
	props:{
		title: {
			type: String,
			default: ''
		},
		currentData: {
			type: [String, Object],
			default: ''
		}
	},
	
	methods: {
		rightClick() {
			this.$emit('rightClick')
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.poetry-swipe{
		height: 100%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: relative;
		.content{
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 101;
		}
		.mask{
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 100;
			background-color: rgba(255, 255, 255, .1);
		}
	}
</style>

<style lang="less">
	.poetry-swipe{
		.van-nav-bar {
			background: initial;
			.van-nav-bar__text, .van-icon, .van-nav-bar__title{
				color: #000;
			}
		}
		.van-hairline--bottom::after{
			border: none;
		}
	}
</style>
