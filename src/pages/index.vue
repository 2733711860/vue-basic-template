<template>
	<div>
		<van-uploader :after-read="afterRead" />
	</div>
</template>

<script>
import { uploadPicture } from '@/api';
export default {
	data () {
		return {
		}
	},
	
	methods: {
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
</style>

