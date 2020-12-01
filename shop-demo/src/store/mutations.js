// 引入方法名
import {
    ADD_GOODS,
    INIT_SHOP_CART,
    DELECT_SHOP_GOOD
} from './mutations-type'

// 引入本地存储
import {getStore, setStore, removeStore} from './../config/global'

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
     */
    [DELECT_SHOP_GOOD](state, {goodId}) {
        // 1. 存放变量
        let shopCart = state.shopCart; // 商品
        let good = shopCart[goodId]; // 单个商品
        // 2. 是否存在商品
        if (good) {
            delete shopCart[goodsId]; // 删除商品
        } else {
            good = null;
        }
        // 3. 拷贝对象
        state.shopCart = {...shopCart};
        // 4. 存放本地
        setStore('shopCart', state.shopCart);
    }
}
