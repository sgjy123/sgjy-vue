<!--
 * @Descripttion: 用户中心
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/12/16 11:37
-->
<template>
    <div class="user-center" id="userCenter">
        <!--导航条-->
        <van-nav-bar title="用户中心"
                     left-arrow
                     :fixed="true"
                     :border="true"
                     :placeholder="true"
                     @click-left="$router.go(-1)"/>
        <van-cell-group>
            <van-cell title="用户名" :value="userInfo.real_name"/>
            <van-cell title="手机号" :value="userInfo.phone"/>
        </van-cell-group>
        <div class="exit-wrap">
            <van-button round color="#75a342" block @click="exitLogin">退出登录</van-button>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import {getLogOut} from './../../../service/api/index'

    export default {
        name: "UserCenter",
        data() {
            return {}
        },
        components: {},
        computed: {
            ...mapState(['userInfo'])
        },
        created() {
        },
        mounted() {
        },
        methods: {
            ...mapMutations(['CLEAR_CART', 'CLEAR_USER_INFO']),
            /**
             * @description: 退出登录
             * @author: 上官靖宇
             * @date: 2020-12-16
             */
            async exitLogin() {
                let res = await getLogOut();
                if(res.success_code === 200){
                    // 清空本地的数据
                    this.CLEAR_USER_INFO();
                    // 清空本地的购物车
                    this.CLEAR_CART();
                    this.$toast('退出登录成功!');
                    this.$router.push('/login')
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    #userCenter {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: #f5f5f5;
        z-index: 200;
        /deep/ .van-nav-bar__title {
            color: #333333;
        }
        .exit-wrap {
            width: 80%;
            margin: 15px auto 0;
        }
    }
</style>
