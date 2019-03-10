<template>
    <div class="goods-info"   @click="goGoodsPage()">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%"/>
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice}}</div>
    </div>
</template>

<script>
    export default {

        props:['goodsImage','goodsName','goodsPrice','goodsId'],
        methods: {
            //跳转，传递
            goGoodsPage(){
                this.$router.push({name: 'Goods', 
                query:{
                    goodsId: this.goodsId,
                    goodsImage: this.goodsImage,
                    goodsName: this.goodsName,
                    goodsPrice: this.goodsPrice,
                    } 
                })  
            }
        }
    }
</script>

<style scoped>
.goods-info{
    border-bottom: 1px solid orange
}
.goods-name{
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>