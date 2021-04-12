<template>
	<div class="poetry-swipe" :style="{ backgroundImage: picUrl }">
		<div class="content">
			<van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)">
				<template #right>
					<van-icon name="search" class="search" size="18" @click="showSearch=true" />
					<van-icon name="ellipsis" size="18" @click="rightClick" />
				</template>
			</van-nav-bar>
			<div class="contents" @scroll.passive="getScroll($event)">
				<van-cell is-link v-for="(item, index) in currentData.list" :key="index+'ite'" @click="showDetail(item)">
				  <template #title>
						<div>{{item.author}}</div>
						<div>{{item.name}}</div>
				  </template>
				</van-cell>
			</div>
		</div>
		
		<poetry-card v-model="showCard" :poetryObj="poetryObj"></poetry-card>
		<poetry-search v-model="showSearch" @showDetail="showDetail"></poetry-search>
		<div class="mask"></div>
	</div>
</template>

<script>
import { randomNum } from '@/utils';
import poetryCard from './poetry-card.vue';
import poetrySearch from './poetry-search.vue';
export default {
	data() {
		return {
			showCard: false,
			poetryObj: '',
			showSearch: false
		}
	},
	
	components: {
		poetryCard, poetrySearch
	},
	
	computed: {
		picUrl() {
			let bgUrl = `${sysConfig.qiniuPicUrl}/mwd-picture-${randomNum(31, 60)}.jpg` ?
				`${sysConfig.qiniuPicUrl}/mwd-picture-${randomNum(31, 60)}.jpg` :
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
		},
		isChangeSwiper: {
			type: Boolean,
			default: false
		}
	},
	
	methods: {
		rightClick() {
			this.$emit('rightClick')
		},
		
		showDetail(item) {
			this.poetryObj = item;
			this.showCard = true;
		},
		
		getScroll(event) { // 滚动条距离底部的距离
			let scrollBottom =
				event.target.scrollHeight -
				event.target.scrollTop -
				event.target.clientHeight;
			if (!this.isChangeSwiper && !this.currentData.finished && scrollBottom < 30) {
				this.$emit('loadMore');
			}
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
			display: flex;
			flex-direction: column;
			.contents{
				flex: 1;
				overflow-y: auto;
			}
			.search{
				margin-right: 10px;
			}
		}
		.mask{
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 100;
			background-color: rgba(255, 255, 255, .5);
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
		.content{
			.contents{
				.van-cell{
					display: flex;
					align-items: center;
					background-color: rgba(0, 0, 0, .05);
				}
				.van-cell::after{
					border-bottom: 1PX solid rgba(0, 0, 0, .2);
				}
			}
		}
	}
</style>
