import ajax from './ajax';
// 定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc';
// 请求首页
export const getHomeInfo = ()=> ajax(BASE_URL + '/api/homeApi');
