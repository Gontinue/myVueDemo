<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar 
                title="商品详情"
                left-text="返回"
                fixed
                left-arrow
                @click-left="onClickLeft"/>
        </div>
        <!-- left-arrow 是否显示左侧箭头，默认值是true，也就是显示 -->
        <div class="topimage-div">
            <img :src="goodsImage" width="90%">
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">价格 : ￥{{goodsPrice}}元</div>

        <!-- 底栏 -->
        <div class="goods-bottom">
            <div>
                <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">直接购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { Toast, Tab, Tabs } from 'vant'
    export default {
        data(){
            return{
                goodsId: '',
                goodsImage: '',
                goodsName: '',
                goodsPrice: '',
            }
        },
        created(){
            this.goodsImage = this.$route.query.goodsImage  //用route接受参数  又是个坑！
            this.goodsName = this.$route.query.goodsName
            this.goodsPrice = this.$route.query.goodsPrice
            this.goodsId = this.$route.query.goodsId
            console.log(this.goodsImage)
            console.log(this.goodsName)
            console.log(this.goodsPrice)
            console.log(this.goodsId)
            //this.getInfo()
        },
        components:{},
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            /**
            操作localStoarge.
             */
            addGoodsToCart(){
                //取出本地购物车中的商品数据
                let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
                //判断购物车是否有这个商品
                let isHaveGoods = cartInfo.find((cart)=>cart.goodsId == this.goodsId)
                console.log(isHaveGoods)
                if(!isHaveGoods){
                    //没有商品直接添加到数组中
                    let newGoodsInfo = {
                        goodsId: this.goodsId,
                        name: this.goodsName,
                        price: this.goodsPrice,
                        image: this.goodsImage,
                        count: 1,
                    }
                    cartInfo.push(newGoodsInfo)                         //添加
                    localStorage.cartInfo = JSON.stringify(cartInfo)    //操作本地数据
                    Toast.success('添加成功')
                }else{
                    Toast.success('已有此商品')
                }
                this.$router.push({name: 'Cart'})                      
            }
        }   
    }
</script>

<style scoped>
.topimage-div{
    margin-top: 46px;
}
.goods-name{
    background: #ffffff
}
.goods-price{

    float: right;
    color: #961229;
    background-color: orange;
    border-radius: 4px 0 0 4px;
    height: 1.8rem;
    line-height: 1.8rem;
}
.detail{
    font-size:0
}
.goods-bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-flow:nowrap;
}
.goods-bottom > div{
    flex: 1;
    padding: 5px;
}
</style>