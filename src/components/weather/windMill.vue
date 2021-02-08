<template>
	<div class="box">
		<ul>
			<li class="li_1st"></li>
			<li class="li_2nd"></li>
			<li class="li_3th"></li>
			<li class="li_4th"></li>
		</ul>
	</div>
</template>

<script>
</script>

<style scoped="scoped" lang="less">
	.box{
		width: 150px;
		height: 150px;
	}
	ul {
		position: relative;
		width: 50px;
		height: 50px;
		top: 50px;
		left: 20%;
		transform-style: preserve-3d;
		animation: sport 18s linear 0s infinite normal;
	}

	/*旋转动画*/
	@keyframes sport {
		form {
			transform: rotateZ(0deg);
		}

		to {
			transform: rotateZ(360deg);
		}
	}

	ul li {
		position: absolute;
		top: 0;
		left: 0;
		border: 20px solid transparent;
		list-style: none;
	}

	/*每个风车叶子旋转角度和距离差值*/
	li.li_1st {
		border-bottom: 20px solid #ECF0F1;
		transform: translateY(-30px) rotateZ(45deg);
	}

	li.li_2nd {
		border-bottom: 20px solid #95A5A5;
		transform: translateX(30px) rotateZ(135deg);

	}

	li.li_3th {
		border-bottom: 20px solid #ECF0F1;
		transform: translateY(30px) rotateZ(225deg);

	}

	li.li_4th {
		border-bottom: 20px solid #95A5A5;
		transform: translateX(-30px) rotateZ(315deg);
	}
</style>
