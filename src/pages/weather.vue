<template>
	<div class="weather-page" id="rySwiper">
		<div class="swiper-wrapper">
			<div class="swiper-slide">
				<weather-one :weatherObj="weatherObj" :oneWord="oneWord" @chooseCity="chooseCity"></weather-one>
			</div>
			<div class="swiper-slide">
				<weather-two :weatherObj="weatherObj" :sevenWeather="sevenWeather" @chooseCity="chooseCity"></weather-two>
			</div>
		</div>
		<div class="swiper-pagination"></div>
		
		<van-popup v-model="showAddress" position="bottom">
			<van-picker show-toolbar title="地址" :columns="mapCityList" @confirm="onConfirm" @cancel="showAddress = false" />
		</van-popup>
	</div>
</template>

<script>
import Swiper from 'swiper';
import weatherOne from '@/components/weather/sweather-one.vue';
import weatherTwo from '@/components/weather/weather-two.vue';
import { getWeather, getSevenWeather, getOpenOneGood } from '@/api';
import { cityList } from '@/utils';
export default {
	components: {
		weatherOne, weatherTwo
	},
	
	data() {
		return {
			weatherObj: '',
			sevenWeather: '',
			cityId: '',
			mapCityList: [],
			showAddress: false,
			oneWord: ''
		}
	},
	
	mounted() {
		this.getNowWeather()
		this.getSevenWeather()
		this.getOpenOneGood()
		this.initSwiper()
		this.mapCitys()
	},
	
	methods: {
		initSwiper() {
			this.$nextTick(() => {
				new Swiper ('#rySwiper', {
					// direction: 'vertical'
					pagination: '.swiper-pagination',
					noSwipingClass : 'scroll-wrap'
				})
			})
		},
		
		getSevenWeather() {
			getSevenWeather({
				cityid: this.cityId
			}).then(res => {
				this.sevenWeather = res.data;
			})
		},
		
		getNowWeather() { // 获取天气
			getWeather({
				cityid: this.cityId
			}).then(res => {
				this.weatherObj = res.data;
			})
		},
		
		getOpenOneGood() { // 随机名言
			getOpenOneGood().then(res => {
				this.oneWord = res.data.txt;
			})
		},
		
		mapCitys() { // 拼接地址格式
			let province_list = []
			let citys = []
			cityList.forEach(item => {
				if (province_list.findIndex(iteem => iteem.provinceZh == item.provinceZh) == -1) {
					province_list.push(item)
				}
				if (citys.findIndex(iteem => iteem.leaderZh == item.leaderZh) == -1) {
					citys.push(item)
				}
			})
			
			this.mapCityList = province_list.map(item => {
				return {
					text: item.provinceZh,
					children: citys.map(iteem => {
						if (iteem.provinceZh == item.provinceZh) {
							return {
								text: iteem.leaderZh,
								children: cityList.map(iteeem => {
									if (iteeem.leaderZh == iteem.leaderZh) {
										return {
											text: iteeem.cityZh,
											id: iteeem.id,
										}
									}
								}).filter(noUn => noUn != undefined)
							}
						}
					}).filter(noUn => noUn != undefined)
				}
			})
		},
		
		chooseCity() {
			this.showAddress = true
		},
		
		onConfirm(value, index) {
			this.showAddress = false;
			this.cityId = this.mapCityList[index[0]].children[index[1]].children[index[2]].id;
			this.getSevenWeather();
			this.getNowWeather();
			this.getOpenOneGood();
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.weather-page, .swiper-wrapper, .swiper-slide{
		height: 100%;
	}
</style>

<style lang="less">
	.weather-page{
		.swiper-pagination-bullet{
			background: #f4f4f4;
		}
	}
</style>
