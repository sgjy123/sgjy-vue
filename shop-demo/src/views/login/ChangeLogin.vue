<!--
 * @Descripttion: 选择登陆方式
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/12/11 13:15
-->
<template>
    <div class="change-login" id="changeLogin">
        <img src="./../../images/lk_logo_sm.png" alt="小撩买菜" class="logo">
        <h4 class="sg-mb-10">选择登录方式</h4>
        <div class="login-type">
            <van-button type="primary" block round to="/login">手机登录</van-button>
            <!--<van-button type="primary" block round to="/login">手机登录</van-button>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChangeLogin",
        data() {
            return {}
        },
        components: {},
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    #changeLogin {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 3.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f5f5f5;
        .logo {
            width: 300px;
            margin-bottom: 1rem;
        }
        .login-type {
            width: 100%;
            padding-left: 15px;
            padding-right: 15px;
        }
    }
</style>
