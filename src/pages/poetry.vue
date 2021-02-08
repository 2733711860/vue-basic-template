<template>
	<div class="poetry-page" id="poetryid">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(item, index) in types" :key="index">
				<poetry-swiper :title="item.type" :currentData="currentData" @rightClick="rightClick"></poetry-swiper>
			</div>
		</div>
		
		<poetry-type :types="types" v-model="showType" @getTypePoetry="getTypePoetry"></poetry-type>
	</div>
</template>

<script>
import { getSearchPoetry, getPoetryBytype, getPoetryType } from '@/api';
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
			showType: false
		}
	},
	
	computed: {
	},
	
	mounted() {
		this.getPoetryTypes();
		this.getPoetry('唐诗三百首');
	},
	
	methods: {
		getPoetryTypes() { // 获取诗词类型
			getPoetryType().then(res => {
				this.types = res.data.list;
				this.initSwiper();
			})
		},
		
		getPoetry(type) { // 获取诗词
			getPoetryBytype({
				type: type
			}).then(res => {
				this.currentData = {
					type: type,
					list: res.data.list
				}
				this.swiperData.push(this.currentData);
			})
		},
		
		initSwiper() { // 初始化轮播
			this.$nextTick(() => {
				this.swiperDom = new Swiper ('#poetryid', {
					onTransitionStart: (event) => {
					  let index = event.activeIndex;
						let currentType = this.types[index].type;
						let currentIndex = this.swiperData.findIndex(item => item.type == currentType);
						if (currentIndex == -1) { // 如果没有则去调接口获取
							this.getPoetry(currentType);
						} else {
							this.currentData = this.swiperData[currentIndex];
						}
					}
				})
			})
		},
		
		rightClick() { // 显示类型弹框
			this.showType = true;
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
