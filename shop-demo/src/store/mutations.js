import {
    ADD_GOODS
} from './mutations-type'

export default {
    // 购物车中添加商品
    [ADD_GOODS](state, {goodsId, goodsName, smallImage, goodsPrice}){
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
    }
}
