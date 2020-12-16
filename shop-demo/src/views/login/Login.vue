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
                                <van-button size="small" color="#75a342" @click="sendCode">{{codeTime}}</van-button>
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
                                <van-image ref="userImgCode" src="http://demo.itlike.com/web/xlmc/api/captcha"
                                           @click="getImgCode"/>
                            </template>
                        </van-field>
                    </van-tab>
                </van-tabs>
                <!--提交按钮-->
                <div class="sg-mt-15">
                    <div class="sg-mb-10">
                        <van-button round color="#75a342" block @click="login">登录</van-button>
                    </div>
                    <van-button round color="#75a342" block plain @click="goBackPage">返回</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getPhoneCode, phoneLogin, pwdLogin} from './../../service/api/index';
    import {mapActions} from 'vuex';

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
                // 倒计时
                codeTime: '发送验证码',
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
            ...mapActions(['syncUserInfo']),
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
            },
            /**
             * @description: 返回订单页
             * @author: 上官靖宇
             * @date: 2020-12-09
             */
            goBackPage() {
                this.$router.back();
            },
            /**
             * @description: 发送验证码
             * @author: 上官靖宇
             * @date: 2020-12-09
             */
            async sendCode() {
                // 1. 验证数据
                if (this.checkSendCode()) {
                    // 2. 倒计时
                    this.countDown();
                    // 3. 请求接口
                    let res = await getPhoneCode(this.phone);
                    console.log(res);
                    // 4. 处理接口
                    if (res.success_code === 200) {
                        this.code = res.code
                    }
                }
            },
            /**
             * @description: 发送验证码倒计时
             * @author: 上官靖宇
             * @date: 2020-12-09
             */
            countDown() {
                // 1. 定义倒计时
                this.codeTime = 60;
                // 设置倒计时
                let phoneTime = setInterval(() => {
                    this.codeTime--;
                    // 判断是否重新计时
                    if (this.codeTime === 0) {
                        // 清空定时器
                        clearInterval(phoneTime);
                        this.codeTime = '发送验证码';
                    }
                }, 1000);
            },
            /**
             * @description: 发送验证码验证
             * @author: 上官靖宇
             * @date: 2020-12-09
             * @return: {
             *     true: 验证通过，
             *     false：验证失败，有错误
             * }
             */
            checkSendCode() {
                // 验证手机号
                if (this.phone.trim() === '') {
                    this.$toast('请输入手机号')
                    return false;
                } else {
                    // 手机号正则
                    let phoneReg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
                    if (!phoneReg.test(this.phone)) {
                        this.$toast('请输入正确的手机号');
                        return false;
                    }
                }
                return true;
            },
            /**
             * @description: 登录
             * @author: 上官靖宇
             * @date: 2020-12-09
             */
            login() {
                // 验证当前登录方式
                if (this.activeLogin === 'phone') { // 手机号
                    this.loginPhone();
                } else if (this.activeLogin === 'password') { // 密码
                    this.loginPassword()
                }
            },
            /**
             * @description: 手机号-登录
             * @author: 上官靖宇
             * @date: 2020-12-09
             */
            async loginPhone() {
                // 验证
                if (this.checkLoginPhone()) {
                    // 定义参数
                    let parms = {
                        phone: this.phone,
                        code: this.code
                    }
                    // 请求接口
                    let res = await phoneLogin(parms);
                    // 返回值
                    if (res.success_code === 200) {
                        this.$toast('登录成功');
                        // 保存用户信息到本地
                        this.syncUserInfo(res.data);
                        this.$router.back();
                    } else {
                        this.$toast(res.message);
                    }

                }
            },
            /**
             * @description: 手机号码登录验证
             * @author: 上官靖宇
             * @date: 2020-12-09
             * @return: {
             *     true: 验证通过，
             *     false：验证失败，有错误
             * }
             */
            checkLoginPhone() {
                // 验证手机号
                if (this.phone.trim() === '') {
                    this.$toast('请输入手机号')
                    return false;
                } else {
                    // 手机号正则
                    let phoneReg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
                    if (!phoneReg.test(this.phone)) {
                        this.$toast('请输入正确的手机号')
                        return false;
                    }
                }
                // 验证验证码
                if (this.code.trim() === '') {
                    this.$toast('请输入验证码')
                    return false;
                } else {
                    // 验证码正则
                    let phoneReg = /^\d{6}$/gi
                    if (!phoneReg.test(this.code)) {
                        this.$toast('请输入正确的验证码')
                        return false;
                    }
                }
                return true;
            },
            /**
             * @description: 密码-登录
             * @author: 上官靖宇
             * @date: 2020-12-09
             */
            async loginPassword() {
                if (this.checkLoginPassword()){
                    // 1. 定义参数
                    let prams = {
                        user_name: this.user_name,
                        user_pwd: this.user_pwd,
                        captcha: this.user_code
                    }
                    // 2. 请求接口
                    let res = pwdLogin(prams);
                    // 2.1 返回值
                    if (res.success_code === 200) {
                        this.$toast('登录成功,请使用手机号登录这个系统');
                        this.syncUserInfo(res.data);
                        this.$router.back();
                    } else {
                        this.$toast('登录失败，用户名或者密码不正确！');
                    }
                }
            },
            /**
             * @description: 手密码-登录 验证
             * @author: 上官靖宇
             * @date: 2020-12-09
             * @return: {
             *     true: 验证通过，
             *     false：验证失败，有错误
             * }
             */
            checkLoginPassword() {
                // 验证用户名
                if (this.user_name.trim() === '') {
                    this.$toast('请输入用户名')
                    return false;
                }
                // 验证密码
                if (this.user_pass.trim() === '') {
                    this.$toast('请输入密码')
                    return false;
                }
                // 验证用户名
                if (this.user_code.trim() === '') {
                    this.$toast('请输入验证码')
                    return false;
                }
                return true;
            },
            /**
             * @description: 获取图片验证码
             * @author: 上官靖宇
             * @date: 2020-12-16
             */
            getImgCode() {
                // 1.获取图片demo
                let imgHtml = this.$refs.userImgCode;
                // 2.设置图片src属性
                this.$set(imgHtml, 'src', 'http://demo.itlike.com/web/xlmc/api/captcha?time=' + new Date())
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
