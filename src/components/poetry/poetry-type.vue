<template>
	<van-popup v-model="show" position="left" :style="{ height: '100%', width: '60%' }">
		<van-cell-group title="类型">
		  <van-cell :title="item.type" :value="item.count" v-for="(item, index) in types" :key="index + 'dsa'" @click="chooseThis(index)" />
		</van-cell-group>
	</van-popup>
</template>

<script>
export default {
	data() {
		return {
			show: this.value
		}
	},
	
	props: {
		types: {
			type: Array,
			default: () => []
		},
		value: ''
	},
	
	watch: {
		value() {
			this.show = this.value;
		},
		show() {
			this.$emit('input', this.show);
		}
	},
	
	methods: {
		chooseThis(index) {
			this.$emit('getTypePoetry', index);
		}
	}
}
</script>

<style>
</style>
