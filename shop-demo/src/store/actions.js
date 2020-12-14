import {
    SAVE_USER_INFO
} from './mutations-type'

export default {
    // 同步用户数据
    syncUserInfo({commit}, userInfo){
        commit(SAVE_USER_INFO, {userInfo});
    }
}
