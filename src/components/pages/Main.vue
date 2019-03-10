<template>
    <div>
        <div class="main-div">
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
        <van-tabbar v-model="active" @change="changeTabbar(active)" active-color="orange">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact">我</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                nowPath: ''//当前路径
            }
        },
        //当页加载完成后执行
        created(){
            this.changeTabbarActive()
        },
        methods: {
            changeTabbarActive(){
                this.nowPath = this.$route.path
                console.log(this.nowPath)
                if(this.nowPath == '/cart'){
                    this.active = 1
                }
            },
            changeTabbar(active) {
                console.log(active)
                switch(active){
                    case 0:
                    this.$router.push({name: 'ShoppingMall'})
                    break;
                    case 1:
                    this.$router.push({name: 'Cart'})
                    break;
                    case 2:
                    this.$router.push({name: 'Member'})
                    break;
                }
            }
        },
    }
</script>

<style scoped>

</style>