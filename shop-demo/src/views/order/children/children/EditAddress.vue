<!--
 * @Descripttion: 编辑地址
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/12/9 13:57
-->
<template>
    <div id="editAddress" class="editAddress">
        <!--导航栏-->
        <van-nav-bar title="修改地址"
                     left-arrow
                     :fixed='true'
                     :border='true'
                     @click-left="$router.go(-1)"></van-nav-bar>
        <van-address-edit :area-list="areaList"
                          :address-info="addressInfo"
                          show-postal
                          show-delete
                          show-set-default
                          @save="onSave"
                          @delete="onDelete"
                          style="margin-top: 3rem"></van-address-edit>
    </div>
</template>

<script>
    export default {
        name: "EditAddress",
        data(){
            return {
                areaList:areaList, // 省市区
                addressInfo: {} // 地址信息
            }
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
    #editAddress {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 9999;
    }
</style>
