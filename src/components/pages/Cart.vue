<template>
    <div>
        <div class="navbar-div">
            <div class="title">购物车</div>
        </div>
        <!-- 显示购物车中的商品 -->
        <div class="cart-list">
            <div class="pang-row" v-for="(item, index) in cartInfo" :key="index">
                <div class="pang-img">
                    <img :src="item.image" width="100%"/>
                    </div>
                <div class="pang-text">
                    <div class="pang-goods-name">{{item.name}}</div>
                    <div class="pang-control">
                        <van-stepper v-model="item.count"></van-stepper>
                    </div>
                </div>
                <div class="pang-goods-price">
                    <div>
                        ￥{{item.price }}
                    </div>
                    <div>
                        x{{item.count}}
                    </div>
                    <div class="allPrice">
                        ￥{{item.price*item.count }}
                    </div> 
                </div>
            </div>
        </div>
        <!-- 显示总金额 -->
        <div class="totalMoney">
            商品总价 : ￥{{totalMoney}}
        </div>
        <div class="cart-title">
            <van-button size="small" type="warning"  >结账</van-button>
            <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                cartInfo: [],   //购物车中商品的信息
            }
        },
        created(){
            this.getCartInfo()
        },
        methods: {
            //得到购物车的商品
            getCartInfo() {
                //判断localStorage里是否有购物车数据
                if(localStorage.cartInfo){
                    //如果有数据，我们去除并赋值给cartInfo
                    this.cartInfo = JSON.parse(localStorage.cartInfo)
                }
                console.log(' this.cartInfo:'+JSON.stringify( this.cartInfo))
            },
            clearCart(){
                localStorage.removeItem('cartInfo')
                this.cartInfo = []
            },
            getTotal(){
                
            }
        },
        //计算总金额
        computed:{
            totalMoney(){
                let allMoney = 0
                this.cartInfo.forEach((item)=>{
                    allMoney += item.price * item.count
                })
                //将再页面添加的商品数量写入本地数据
                localStorage.cartInfo = JSON.stringify(this.cartInfo)
                return allMoney
            }
        },
    }
</script>

<style scoped>
    .title{
        background: orange;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        border-radius: 0 0 10px 10px;
    }
    .cart-title{
        height: 2rem;
        line-height: 2rem;
        background-color: #fff;
        border-bottom: 5px solid #961229;
        padding: 5px;
        text-align: right;
        margin-bottom: 50px;
    }
    .cart-list{
        background-color: #fff;
    }
    .pang-row{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 0.5rem;
        font-size: 0.7rem;
        border-bottom: 1px solid #e4e7ed;
    }
    .pang-img{
        flex: 6;
    }
    .pang-text{
        flex: 14;
        padding-left: 10px;
    }
    .pang-control{
        padding-top: 10px;
    }
    .pang-goods-price{
        flex: 4;
        text-align: right;
        border-left: 1px solid #e4e7ed;
    }
    .allPrice{
        color:red
    }
    .totalMoney{
        color: #961229;
        text-align: right;
        background-color: #fff;
        border-bottom: 1px solid #e4e7ed;
        padding: 5px;
    }
</style>