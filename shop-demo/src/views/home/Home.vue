<!--
 * @Descripttion: 首页
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/10/30 11:47
-->
<template>
    <div id="home" ref="home">
        <!--头部组件-->
        <Header></Header>
    </div>
</template>

<script>
    // 引入接口
    import {getHomeInfo} from './../../service/api/index'

    // 引入组件
    import {Header} from './components/index'

    export default {
        name: "Home",
        data() {
            return {}
        },
        components: {
            Header
        },
        created() {
            this.getHomeInfo();
        },
        mounted() {
        },
        methods: {
            getHomeInfo() {
                getHomeInfo().then((res)=>{
                    console.log(res);
                }).catch((err)=>{
                    console.log(err);
                })
            }
        },
    }
</script>

<style lang='scss'>

</style>
