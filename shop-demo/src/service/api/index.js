import ajax from './ajax';
// 定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc';
// 请求首页
export const getHomeInfo = ()=> ajax(BASE_URL + '/api/homeApi'); // 首页数据
export const getCategories = () => ajax(BASE_URL + '/api/homeApi/categories'); // 分类数据
export const getCategoriesDetail = (preParams) => ajax(BASE_URL + '/api/homeApi/categoriesdetail' + preParams); // 分类详情商品

// 登录相关
export const getPhoneCode = (phone)=> ajax(BASE_URL + '/api/send_code', {phone}); // 获取验证码
export const phoneLogin = (prams)=> ajax(BASE_URL + '/api/login_code', prams, 'POST'); // 手机号登录
