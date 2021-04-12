<template>
	<div class="poetry-page" id="poetryid">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(item, index) in types" :key="index">
				<poetry-swiper :title="item.type" :currentData="currentData" :isChangeSwiper="isChangeSwiper" @loadMore="loadMore" @rightClick="rightClick"></poetry-swiper>
			</div>
		</div>
		
		<poetry-type :types="types" v-model="showType" @getTypePoetry="getTypePoetry"></poetry-type>
	</div>
</template>

<script>
import { getPoetryBytype, getPoetryType } from '@/api';
import poetrySwiper from '@/components/poetry/poetry-swiper.vue';
import poetryType from '@/components/poetry/poetry-type.vue';
import Swiper from 'swiper';
export default {
	components: {
		poetrySwiper, poetryType
	},
	
	data() {
		return {
			swiperDom: null,
			types: [],
			swiperData: [],
			currentData: '',
			showType: false,
			isChangeSwiper: false
		}
	},
	
	computed: {
	},
	
	mounted() {
		this.getPoetryTypes();
	},
	
	methods: {
		getPoetryTypes() { // 获取诗词类型
			getPoetryType().then(res => {
				this.types = res.data.list;
				this.getPoetry(this.types[0].type, 1);
				this.initSwiper();
			})
		},
		
		getPoetry(type, page) { // 获取诗词
			getPoetryBytype({
				type: type,
				page: page,
				pageSize: 20
			}).then(res => {
				let thalData = this.swiperData.find(item => item.type == type);
				let currentIndex = this.swiperData.findIndex(item => item.type == type);
				if (thalData) {
					this.currentData = {
						page: page,
						type: type,
						finished: page * 20 >= res.data.total,
						list: [...thalData.list, ...res.data.list]
					}
					this.swiperData.splice(currentIndex, 1, this.currentData);
				} else {
					this.currentData = {
						page: page,
						type: type,
						finished: page * 20 >= res.data.total,
						list: res.data.list
					}
					this.swiperData.push(this.currentData);
				}
			})
		},
		
		initSwiper() { // 初始化轮播
			this.$nextTick(() => {
				this.swiperDom = new Swiper ('#poetryid', {
					onTransitionStart: (event) => {
						this.isChangeSwiper = true;
					  let index = event.activeIndex;
						let currentType = this.types[index].type;
						let currentIndex = this.swiperData.findIndex(item => item.type == currentType);
						if (currentIndex == -1) { // 如果没有则去调接口获取
							this.getPoetry(currentType, 1);
						} else {
							this.currentData = this.swiperData[currentIndex];
						}
					},
					onTransitionEnd: () => {
						this.isChangeSwiper = false;
					}
				})
			})
		},
		
		rightClick() { // 显示类型弹框
			this.showType = true;
		},
		
		loadMore() { // 加载更多
			let page = this.currentData.page + 1;
			this.getPoetry(this.currentData.type, page);
		},
		
		getTypePoetry(index) { // 选择类型
			this.showType = false;
			this.swiperDom.slideTo(index, 500)
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.poetry-page{
		height: 100%;
		font-family: cursive;
		.swiper-wrapper, .swiper-slide{
			height: 100%;
		}
	}
</style>

<style lang="less">
	.poetry-page{
		.swiper-pagination-bullet{
			background: #f4f4f4;
		}
	}
</style>
