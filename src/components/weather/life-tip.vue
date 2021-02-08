<template>
	<div class="tip-div" v-if="show">
		<div class="content bounceinT" :style="{ backgroundImage: picUrl }">
			<div class="card-content">
				<div class="cart-div">
					<div class="top">
						<div class="left">
							<div>{{windObj ? windObj.week : '星期一'}}</div>
							<div>{{windObj ? windObj.tem : '10'}}℃</div>
						</div>
						<div class="right">
							<i class="iconfont" :class="['icon-' + windObj.wea_img]" v-if="windObj"></i>
							<div>{{windObj ? windObj.wea : '晴'}}</div>
						</div>
					</div>
					
					<div class="middle">
						<div>{{tipsDetail ? tipsDetail.desc : ''}}</div>
						<div>{{windObj ? windObj.air_tips : ''}}</div>
					</div>
					
					<div class="bottom">某某天气</div>
				</div>
				
				<div class="nei-overlay"></div>
			</div>
			
			<i class="iconfont icon-close" @click="show=false"></i>
		</div>
		
		<div class="overlay" @click="show=false"></div>
	</div>
</template>

<script>
import { randomNum } from '@/utils';
export default {
	data() {
		return {
			classObject: 'a-bounceinT',
			show: this.value,
			picIndex: 1
		}
	},
	
	props: {
		value: {},
		windObj: {
			type: [String, Object],
			default: ''
		},
		tipsDetail: {
			type: [String, Object],
			default: ''
		}
	},
	
	watch: {
		value() {
			this.show = this.value;
			if (this.value) {
				this.picIndex = randomNum(1, 30)
			}
		},
		show() {
			this.$emit('input', this.show)
		}
	},
	
	computed: {
		picUrl() {
			let bgUrl = `http://qnmfzc41w.hn-bkt.clouddn.com/mwd-picture-${this.picIndex}.jpg` ? 
				`http://qnmfzc41w.hn-bkt.clouddn.com/mwd-picture-${this.picIndex}.jpg` :
				require(`@/assets/img/weather/bg.jpg`);
			return `url(${bgUrl})`
		},
	},
	
	methods: {
		showPopup() {
			this.show = true;
		},
	}
}
</script>

<style scoped="scoped" lang="less">
	.tip-div{
		position: absolute;
		width: 100%;
		height: 100%;
		
		.content{
			width: 80%;
			height: 70%;
			position: absolute;
			left: 50%;
			top: 50%;
			border-radius: 7px;
			transform: translate(-50%, -50%);
			background-color: #FFFFFF;
			background-repeat: no-repeat;
			background-size: cover;
			// background-size: 100% 100%;
			z-index: 110;
			
			.card-content{
				font-family: cursive;
				position: relative;
				width: 100%;
				height: 100%;
				.cart-div{
					padding: 20px 15px;
					width: 100%;
					height: 100%;
					position: absolute;
					z-index: 111;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.top{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.left{
							div:first-child{
								font-size: 20px;
								line-height: 30px;
							}
							div:last-child{
								font-size: 40px;
								line-height: 70px;
							}
						}
						.right{
							display: flex;
							flex-direction: column;
							align-items: center;
							.iconfont{
								font-size: 35px;
								margin-bottom: 10px;
							}
						}
					}
					.middle{
						font-size: 17px;
						div{
							line-height: 25px;
						}
						div:first-child{
							margin-bottom: 20px;
						}
						div:last-child{
							// margin-top: 40px;
						}
					}
					.bottom{
						text-align: center;
					}
				}
				.nei-overlay{
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-color: rgba(0, 0, 0, .2);
				}
			}
			
			.icon-close{
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: -55px;
				color: #FFFFFF;
				font-size: 35px;
			}
		}
		
		.overlay{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, .6);
			z-index: 100;
		}
	}
	
	
	.bounceinT{
		-webkit-animation: bounceinT 1s ease-out backwards;
		-moz-animation: bounceinT 1s ease-out backwards;
		-ms-animation: bounceinT 1s ease-out backwards;
		animation: bounceinT 1s ease-out backwards;
	}
	
	@-webkit-keyframes bounceinT {
		0% {
			opacity: 0;
			-webkit-transform: translate(-50%, -100%);
		}
		
		40% {
			-webkit-transform: translate(-50%, -50%);
		}
	
		60% {
			opacity: 1;
			-webkit-transform: translate(-50%, -55%);
		}
	
		80% {
			-webkit-transform: translate(-50%, -50%);
		}
	}
	
	@-moz-keyframes bounceinT {
		0% {
			opacity: 0;
			-moz-transform: translate(-50%, -100%);
		}
		
		40% {
			opacity: 1;
			-moz-transform: translate(-50%, -50%);
		}
	
		60% {
			opacity: 1;
			-moz-transform: translate(-50%, -55%);
		}
	
		80% {
			-moz-transform: translate(-50%, -50%);
		}
	}
	
	@-ms-keyframes bounceinT {
		0% {
			opacity: 0;
			-ms-transform: translate(-50%, -100%);
		}
		
		40% {
			-ms-transform: translate(-50%, -50%);
		}
	
		60% {
			opacity: 1;
			-ms-transform: translate(-50%, -55%);
		}
	
		80% {
			-ms-transform: translate(-50%, -50%);
		}
	}
	
	@keyframes bounceinT {
		0% {
			opacity: 0;
			transform: translate(-50%, -100%);
		}
		
		40% {
			transform: translate(-50%, -50%);
		}
	
		60% {
			opacity: 1;
			transform: translate(-50%, -55%);
		}
	
		80% {
			transform: translate(-50%, -50%);
		}
	}
</style>
