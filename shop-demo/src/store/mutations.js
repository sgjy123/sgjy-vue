// 引入方法名
import {
    ADD_GOODS,
    INIT_SHOP_CART
} from './mutations-type'

// 引入本地存储
import {getStore, setStore, removeStore} from './../config/global'

export default {
    // 购物车中添加商品
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
    // 购物车初始化
    [INIT_SHOP_CART](state) {
        // 1. 获取本地存储的购物车数据
        let initCartData = getStore('shopCart');
        // 2. 判断是否存在相关数据
        if (initCartData) { // 存在
            state.shopCart = JSON.parse(initCartData);
        }
    }
}
