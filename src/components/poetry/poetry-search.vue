<template>
	<van-popup v-model="show" round position="bottom" :style="{ height: '90%', backgroundColor: '#f7f8fA' }" class="search-popup">
		<van-search
		  v-model="searchKey"
			shape="round"
		  show-action
		  placeholder="请输入搜索关键词"
		  @search="onSearch"
		>
		  <template #action>
		    <div @click="onSearch">搜索</div>
		  </template>
		</van-search>
		
		<div class="search-content" @scroll.passive="getScroll($event)">
			<van-cell is-link v-for="(item, index) in resultList" :key="index+'sear'" @click="showDetail(item)">
			  <template #title>
					<div>{{item.author}}</div>
					<div>{{item.name}}</div>
			  </template>
			</van-cell>
		</div>
	</van-popup>
</template>

<script>
import { getSearchPoetry } from '@/api';
export default {
	data() {
		return {
			show: this.value,
			searchKey: '',
			resultList: [],
			page: 1,
			finished: false
		}
	},
	
	props: {
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
		onSearch() {
			if (!this.searchKey) {
				this.$dialog.alert({
					message: '请输入搜索关键词',
				});
			} else {
				this.page = 1;
				this.searchData();
			}
		},
		
		searchData() {
			getSearchPoetry({
				page: this.page,
				pageSize: 10,
				keyWord: this.searchKey
			}).then(res => {
				this.finished = this.page * 10 >= res.data.total;
				this.resultList = [...this.resultList, ...res.data.list];
			})
		},
		
		getScroll(event) { // 滚动条距离底部的距离
			let scrollBottom =
				event.target.scrollHeight -
				event.target.scrollTop -
				event.target.clientHeight;
			if (!this.finished && scrollBottom < 30) {
				this.page++;
				this.searchData();
			}
		},
		
		showDetail(item) {
			this.show = false;
			this.$emit('showDetail', item);
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.search-popup{
		display: flex;
		flex-direction: column;
		.search-content{
			flex: 1;
			overflow-y: auto;
		}
	}
</style>

<style lang="less">
	.search-popup{
		.van-search{
			background-color: #fff;
		}
	}
</style>
