<!--
 * @Descripttion: 添加地址页面
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/12/9 13:56
-->
<template>
    <div id="addAddress" class="addAddress">
        <!--导航栏-->
        <van-nav-bar title="添加地址"
                     left-arrow
                     :fixed='true'
                     :border='true'
                     @click-left="$router.go(-1)"></van-nav-bar>
        <van-address-edit :area-list="areaList"
                          :search-result="searchResult"
                          :area-columns-placeholder="['请选择', '请选择', '请选择']"
                          @save="onSave"
                          @change-detail="onChangeDetail"
                          style="margin-top: 3rem"
                          show-postal
                          show-set-default
                          show-search-result/>
    </div>
</template>

<script>
    export default {
        name: "AddAddress",
        data() {
            return {
                areaList,
                searchResult: [],
            };
        },
        components: {},
        created() {
        },
        mounted() {
        },
        methods: {
            onSave() {
                Toast('save');
            },
            onDelete() {
                Toast('delete');
            },
            onChangeDetail(val) {
                if (val) {
                    this.searchResult = [
                        {
                            name: '黄龙万科中心',
                            address: '杭州市西湖区',
                        },
                    ];
                } else {
                    this.searchResult = [];
                }
            },
        }
    }
</script>

<style lang='scss' scoped>
    #addAddress {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 9999;
    }
</style>
