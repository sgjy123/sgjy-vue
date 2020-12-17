import ajax from './ajax';
// 定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc';
// 请求首页
export const getHomeInfo = () => ajax(BASE_URL + '/api/homeApi'); // 首页数据
export const getCategories = () => ajax(BASE_URL + '/api/homeApi/categories'); // 分类数据
export const getCategoriesDetail = (preParams) => ajax(BASE_URL + '/api/homeApi/categoriesdetail' + preParams); // 分类详情商品

// 登录相关
export const getPhoneCode = (phone) => ajax(BASE_URL + '/api/send_code', {phone}); // 获取验证码
export const phoneLogin = (prams) => ajax(BASE_URL + '/api/login_code', prams, 'POST'); // 手机号登录
export const pwdLogin = (prams) => ajax(BASE_URL + '/api/login_pwd', prams, 'POST'); // 手机号登录
export const getLogOut = () => ajax(BASE_URL + '/api/logout'); // 退出登录
export const getUserInfo = () => ajax(BASE_URL + '/api/userinfo'); // 自动登录

// 购物车相关
export const addGoodsToCart = (prams) => ajax(BASE_URL + '/api/cart/add', prams, 'POST'); // 添加商品
export const getGoodsCart = (user_id) => ajax(BASE_URL + '/api/cart/search/' + user_id); // 获取当前用户购物车中的商品
export const changeCartNum = (prams) => ajax(BASE_URL + '/api/cart/num', prams, 'POST'); // 修改购物车商品数量
export const clearAllCart = (user_id) => ajax(BASE_URL + '/api/cart/clear/' + user_id); // 删除当前用户购物车中所有的商品
export const singerGoodsSelect = (prams) => ajax(BASE_URL + '/api/cart/singer_select', prams, 'POST'); // 单个商品的选中和取消选中
export const allGoodsSelect = (prams) => ajax(BASE_URL + '/api/cart/all_select', prams, 'POST'); // 所有商品的选中和取消选中
export const getAllSelectedGoods = (user_id) => ajax(BASE_URL + '/api/cart/selected/' + user_id); // 查询所有已经被选中的商品
export const delAllSelectedGoods = (user_id) => ajax(BASE_URL + '/api/cart/del_checked/' + user_id); // 删除已经生成订单的商品



