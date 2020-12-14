// 引入方法名
import {
    ADD_GOODS,
    INIT_SHOP_CART,
    DELECT_SHOP_GOOD,
    SELECT_SINGLE_GOOD,
    REDUCE_GOODS,
    CLEAR_CART,
    SELECT_ALL_GOODS,
    SAVE_USER_INFO,
    GET_USER_INFO,
    CLEAR_USER_INFO
} from './mutations-type'

// 引入本地存储
import {getStore, setStore, removeStore} from './../config/global';
// 导入vue
import Vue from 'vue';

export default {
    /**
     * @description: 购物车中添加商品
     * @param: {state} 存储信息
     * @param: {goodsId} 商品ID
     * @param: {goodsName} 商品名称
     * @param: {smallImage} 商品图片
     * @param: {goodsPrice} 商品价格
     */
    [ADD_GOODS](state, {goodsId, goodsName, smallImage, goodsPrice}) {
        // 1. 存放数据
        let shopCart = state.shopCart;
        // 2. 判断商品是否存在
        if (shopCart[goodsId]) { // 存在
            // 2.1 商品数量加一
            shopCart[goodsId]['num']++;
        } else { // 不存在
            // 2.2 创建商品
            shopCart[goodsId] = {
                'num': 1,
                'id': goodsId,
                "name": goodsName,
                "small_image": smallImage,
                "price": goodsPrice,
                "checked": true
            }
        }
        // 3. 拷贝对象
        state.shopCart = {...shopCart};
        // 4. 存放本地
        setStore('shopCart', state.shopCart);
    },

    /**
     * @description: 购物车初始化
     * @param: {state} 存储信息
     */
    [INIT_SHOP_CART](state) {
        // 1. 获取本地存储的购物车数据
        let initCartData = getStore('shopCart');
        // 2. 判断是否存在相关数据
        if (initCartData) { // 存在
            state.shopCart = JSON.parse(initCartData);
        }
    },
    /**
     * @description: 删除单个商品
     * @param: {state} 存储信息
     * @param: {goodId} 商品ID
     */
    [DELECT_SHOP_GOOD](state, {goodId}) {
        // 1. 存放变量
        let shopCart = state.shopCart; // 商品
        let good = shopCart[goodId]; // 单个商品
        // 2. 是否存在商品
        if (good) {
            delete shopCart[goodId]; // 删除商品
            // 3. 拷贝对象
            state.shopCart = {...shopCart};
            // 4. 存放本地
            setStore('shopCart', state.shopCart);
        }
    },
    /**
     * @description: 单个商品选中和反选
     * @param: {state} 存储信息
     * @param: {goodId} 商品ID
     */
    [SELECT_SINGLE_GOOD](state, {goodId}) {
        // 1. 存放变量
        let shopCart = state.shopCart; // 商品
        let good = shopCart[goodId]; // 单个商品
        // 2. 是否存在商品
        if (good) {
            // 4. 拷贝对象
            state.shopCart = {...shopCart};
            // 5. 存放本地
            setStore('shopCart', state.shopCart);
        }
    },
    /**
     * @description: 商品减数量
     * @param: {state} 存储信息
     * @param: {goodId} 商品ID
     */
    [REDUCE_GOODS](state, {goodId}) {
        // 1. 存放变量
        let shopCart = state.shopCart; // 商品
        let good = shopCart[goodId]; // 单个商品
        // 2. 是否存在商品
        if (good) {
            // 3. 判断商品数量是否大于0
            if (good.num > 0) {
                good.num--;
                // 3.1 询问删除
                if (good.num === 0) {
                    delete shopCart[goodId];
                }
            } else {
                good = null;
            }
            // 4. 拷贝对象
            state.shopCart = {...shopCart};
            // 5. 存放本地
            setStore('shopCart', state.shopCart);
        }
    },
    /**
     * @description: 清空购物车
     * @param: {state} 存储信息
     */
    [CLEAR_CART](state) {
        // 1. 清空缓存
        state.shopCart = null;
        // 2. 拷贝对象
        state.shopCart = {...shopCart};
        // 3. 存放本地
        setStore('shopCart', state.shopCart);
    },
    /**
     * @description: 取消全选和选中全选
     * @param: {state} 存储信息
     */
    [SELECT_ALL_GOODS](state, {isSelectAll}) {
        // 1. 存放变量
        let shopCart = state.shopCart; // 商品
        // 2. 循环商品中
        Object.values(shopCart).forEach((goods, index) => {
            if (goods.checked) { // 存在该属性
                goods.checked = isSelectAll;
            } else {
                Vue.set(goods, 'checked', isSelectAll);
            }
        });
        // 3. 拷贝对象
        state.shopCart = {...shopCart};
        // 4. 存放本地
        setStore('shopCart', state.shopCart);
    },
    /**
     * @description: 保存用户信息
     * @param: {state} 存储信息
     */
    [SAVE_USER_INFO](state, {userInfo}) {
        debugger
        // 1. vuex存用户信息
        state.userInfo = userInfo;
        // 2. 本地存用户信息
        setStore('userInfo', state.userInfo);
    },
    /**
     * @description: 获取用户信息
     * @param: {state} 存储信息
     */
    [GET_USER_INFO](state) {
        // 1. 获取本地用户信息
        let userInfo = getStore('userInfo');
        // 2. 判断是否存在
        if (userInfo) {
            state.userInfo = JSON.parse(userInfo);
        }
    },
    /**
     * @description: 清空本地用户信息
     * @param: {state} 存储信息
     */
    [GET_USER_INFO](state) {
        // 1. 清空vuex
        state.userInfo = {};
        // 2. 移除本地
        removeStore('userInfo');
    },
}
