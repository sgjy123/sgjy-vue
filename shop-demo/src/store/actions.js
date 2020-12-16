import {
    SAVE_USER_INFO
} from './mutations-type';
import {getStore} from "./../config/global";
import {getUserInfo} from "./../service/api/index"

export default {
    // 同步用户数据
    syncUserInfo({commit}, userInfo) {
        commit(SAVE_USER_INFO, {userInfo});
    },
    /**
     * @description: 自动登录
     * @param: {state} 存储信息
     */
    async reqUserInfo({commit}) {
        // 1. 获取本地数据
        let userInfo = JSON.parse(getStore('userInfo'));
        // 2. 判断当前是否存在本地用户数据
        if (userInfo) { // 2.1存在
            commit(SAVE_USER_INFO, {userInfo});
        } else { // 2.2 不存在
            // 请求用户信息接口
            let res = await getUserInfo();
            if (res.success_code === 200) {
                commit(SAVE_USER_INFO, {userInfo: res.data});
            }
        }
    }
}
