/**
 * API命名配置列表
 * 命名规则：驼峰式命名方式，动词放前面，名词放后面，
 * 如:addFeatures
 * API命名变量不要太过长
 */
import { get, postFormData } from './http.js'

// export const baseUrl = `http://121.41.79.10:8080/api`
export const baseUrl = `http://localhost:8090/api`
// export const baseUrl = 'https://www.fastmock.site/mock/f5b0436d25760cd9e4b88fdf3de4d459/api'

export const getBookByAuthor = params => get(`${baseUrl}/search/authorbook`, params) // 根据作者查询书籍

export const uploadPicture = params => postFormData(`${baseUrl}/upload/picture`, params) // 上传图片

