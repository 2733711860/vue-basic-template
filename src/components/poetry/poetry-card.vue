<template>
	<div class="tip-div" v-if="show">
		<div class="content bounceinT" :style="{ backgroundImage: picUrl }">
			<div class="card-content">
				<div class="cart-div">
					<div class="title">{{poetryObj ? poetryObj.name : ''}}</div>
					<div class="author">{{poetryObj ? poetryObj.author : ''}}</div>
					<div class="poetry-content">{{poetryObj ? poetryObj.content : ''}}</div>
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
		poetryObj: {
			type: [String, Object],
			default: ''
		}
	},
	
	computed: {
		picUrl() {
			let bgUrl = `${sysConfig.qiniuPicUrl}/mwd-picture-${this.picIndex}.jpg` ? 
				`${sysConfig.qiniuPicUrl}/mwd-picture-${this.picIndex}.jpg` :
				require(`@/assets/img/weather/bg.jpg`);
			return `url(${bgUrl})`
		}
	},
	
	watch: {
		value() {
			this.show = this.value;
			if (this.value) {
				this.picIndex = randomNum(1, 60)
			}
		},
		show() {
			this.$emit('input', this.show)
		}
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
			z-index: 210;
			
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
					z-index: 211;
					display: flex;
					flex-direction: column;
					overflow-y: auto;
					font-size: 16px;
					.title{
						font-size: 20px;
						line-height: 40px;
						text-align: center;
					}
					.author{
						line-height: 30px;
						text-align: center;
					}
					.poetry-content{
						line-height: 30px;
						margin-top: 20px;
						padding: 0 5px;
					}
				}
				.nei-overlay{
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-color: rgba(255, 255, 255, .4);
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
			background-color: rgba(0, 0, 0, .5);
			z-index: 200;
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
