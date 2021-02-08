<template>
	<van-form>
	  <van-field
	    v-model="routeName"
	    name="路由名称"
	    label="路由名称"
	    placeholder="路由名称"
	  />
	  <van-field
	    v-model="routePath"
	    name="路由路径"
	    label="路由路径"
	    placeholder="路由路径"
	  />
		<van-field
		  v-model="routeComponent"
		  name="详细路径"
		  label="详细路径"
		  placeholder="详细路径"
		/>
		<van-field disabled label="meta属性" />
		
		<div v-for="(item, index) in metaList" :key="index" class="item-meta">
			<div>
				<van-field
				  v-model="item.code"
				  label="code"
				  placeholder="code"
				/>
				<van-field
				  v-model="item.value"
				  label="value"
				  placeholder="value"
				/>
			</div>
			<van-button :icon="index == metaList.length - 1 ? 'plus' : 'minus'" type="default" @click="addMeta(index == metaList.length - 1, index)" />
		</div>
		
	  <div style="margin: 16px;">
	    <van-button round block type="info" @click="onSubmit">提交</van-button>
	  </div>
	</van-form>
</template>

<script>
import { uploadPicture, addRoute } from '@/api';
export default {
	data () {
		return {
			routeName: '',
			routePath: '',
			routeComponent: '',
			metaList: [{
				code: '',
				value: ''
			}]
		}
	},
	
	methods: {
		addMeta(result, index) {
			if (result) {
				this.metaList.push({
					code: '',
					value: ''
				})
			} else {
				this.metaList.splice(index, 1)
			}
		},
		
		arrayDeteleKong(list) { // 数组去空
			return new Promise(resolve => {
				let listCopy = JSON.parse(JSON.stringify(list))
				for(var i=0; i<listCopy.length; i++){
					if(listCopy[i].code == ""){
						listCopy.splice(i, 1);
						i--;
					}
				}
				resolve(listCopy)
			})
		},
		
		onSubmit(values) {
			let submitData = [];
			this.arrayDeteleKong(this.metaList).then(list => {
				let codeList = list.map(item => {
					return item.code
				})
				let valueList = list.map(item => {
					return item.value
				})
				var metaObj = {};
				codeList.map( (v,i) => {
					metaObj[codeList[i]] = valueList[i];
				})
				submitData.push({
					name: this.routeName,
					path: this.routePath,
					component: this.routeComponent
				});
				console.log(submitData)
				addRoute(submitData).then(res => {
					console.log(res)
				})
			})
		},
		
		afterRead(file) {
			// 此时可以自行将文件上传至服务器
			let formData = new FormData();
			formData.append('file', file.file);
			formData.append('fileName', 'cssss');
			uploadPicture(formData).then(res => {
				console.log(res)
			})
		},
	}
}
</script>

<style scoped="scoped" lang="less">
	.item-meta{
		display: flex;
		align-items: center;
		border-bottom: 10px solid #f1f1f1;
	}
</style>

