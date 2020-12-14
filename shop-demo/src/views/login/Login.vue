<!--
 * @Descripttion: 登陆
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/12/11 13:29
-->
<template>
    <div id="login" class="login">
        <!--容器-->
        <div class="login-wrap">
            <div class="sg-mb-10 sg-align-center">
                <img src="./../../images/lk_logo_sm.png" alt="小撩买菜" class="logo">
            </div>
            <div class="content-wrap">
                <!--切换-->
                <van-tabs v-model="activeLogin" color="#75a342">
                    <van-tab title="手机登录" name="phone">
                        <van-field v-model="phone"
                                   clearable
                                   style="margin-top: 2.5rem;"
                                   placeholder="手机号">
                            <template #button>
                                <van-button size="small" color="#75a342">发送验证码</van-button>
                            </template>
                        </van-field>
                        <van-field v-model="code"
                                   clearable
                                   placeholder="验证码">
                        </van-field>
                    </van-tab>
                    <van-tab title="密码登录" name="password">
                        <van-field v-model="user_name"
                                   clearable
                                   style="margin-top: 2.5rem;"
                                   placeholder="用户名">
                        </van-field>
                        <van-field v-model="user_pass"
                                   :type="showUserPasswordParm['type']"
                                   :right-icon="showUserPasswordParm['icon']"
                                   @click-right-icon="showUserPassword"
                                   placeholder="密码" clearable>
                        </van-field>
                        <van-field v-model="user_code"
                                   clearable
                                   placeholder="验证码">
                            <template #button>
                                <van-button size="small" color="#75a342">发送验证码</van-button>
                            </template>
                        </van-field>
                    </van-tab>
                </van-tabs>
                <!--提交按钮-->
                <div class="sg-mt-15">
                    <div class="sg-mb-10">
                        <van-button round color="#75a342" block>登录</van-button>
                    </div>
                    <van-button round color="#75a342" block plain>返回</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                // 切换
                activeLogin: 'phone',
                // 手机号
                phone: '',
                // 验证码
                code: '',
                // 用户名
                user_name: '',
                // 密码
                user_pass: '',
                // 用户验证码
                user_code: '',
                // 切换密码框时的参数
                showUserPasswordParm: {
                    value: '0', // 0：关闭; 1: 张开
                    icon: 'closed-eye',
                    type: 'password'
                }
            }
        },
        components: {},
        created() {
        },
        mounted() {
        },
        methods: {
            /**
             * @description: 显示密码
             * @author: 上官靖宇
             * @date: 2020-12-14
             */
            showUserPassword() {
                // 1. 判断当前眼睛是关闭还是睁开
                if (this.showUserPasswordParm['value'] === '0') { // 关闭
                    this.showUserPasswordParm['icon'] = 'closed-eye';
                    this.showUserPasswordParm['type'] = 'password';
                    this.showUserPasswordParm['value'] = '1';
                } else if (this.showUserPasswordParm['value'] === '1') { // 睁开
                    this.showUserPasswordParm['icon'] = 'eye-o';
                    this.showUserPasswordParm['type'] = 'text';
                    this.showUserPasswordParm['value'] = '0';
                }
            }
        }
    }
</script>

<style lang='scss'>
    #login {
        width: 100%;
        height: 100%;
        background: #fff;
    }

    .login-wrap {
        .logo {
            width: 300px;
            margin-bottom: 1rem;
        }

        .content-wrap {
            width: 80%;
            margin: 0 auto;
        }
    }
    @media screen and (-webkit-min-device-pixel-ratio: 0) {
        input {
            line-height: inherit !important;
        }
    }
</style>
