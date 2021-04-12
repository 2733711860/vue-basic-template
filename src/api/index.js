/**
 * API命名配置列表
 * 命名规则：驼峰式命名方式，动词放前面，名词放后面，
 * 如:addFeatures
 * API命名变量不要太过长
 */
import { get, postFormData, post } from './http.js'

// export const baseUrl = `http://121.41.79.10:8080/api`
export const baseUrl = `http://localhost:8090/api`
export const baseUrl1 = 'https://www.fastmock.site/mock/9d11ba8742b2555cfd3aaf42ab46f7bb/api'

export const getBookByAuthor = params => get(`${baseUrl}/search/authorbook`, params) // 根据作者查询书籍

export const uploadPicture = params => postFormData(`${baseUrl}/upload/picture`, params) // 上传图片

export const addRoute = params => post(`${baseUrl}/add/route`, params) // 新加路由

export const getRoute = params => post(`${baseUrl}/get/route`, params) // 获取路由

export const getWeather = params => get(`${baseUrl1}/get/weather`, params) // 获取实况天气

export const getSevenWeather = params => get(`${baseUrl1}/get/sevenday/weather`, params) // 获取七日天气

export const getOpenOneGood = params => get(`${baseUrl1}/all/item?apiCode=6`, params) // 随机返回一句鸡汤正能量

export const getPoetryBytype = params => get(`${baseUrl1}/get/poetry/bytype`, params) // 根据朝代或者作者获取诗词

export const getSearchPoetry = params => get(`${baseUrl1}/get/poetry`, params) // 搜索诗词

export const getPoetryType = params => get(`${baseUrl1}/get/poetry/type`, params) // 诗词类型
