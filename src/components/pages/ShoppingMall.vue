<template>
    <div>
        <!-- search area 查询-->
        <div class="search-bar">
            <van-row >
                <van-col span="3">
                    <img :src="locationIcon" width="60%" class="location-icon">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
        <!-- swiper area 轮播-->
        <div class="swiper-area">
            <van-swipe :autoplay="3000"> 
                <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
                    <img :src="banner.image" width="100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- recomment goods 商品推荐-->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption"> 
                    <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%">
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price}}(￥{{item.mallPrice}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- floor area 楼层商品-->
        <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
        <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
        <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>
        <!-- hot area 热门商品-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <!-- list组件 -->
                <van-list>
                    <van-row >
                        <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
                            <goods-info 
                                :goodsId="item.goodsId" 
                                :goodsImage="item.image" 
                                :goodsName="item.name" 
                                :goodsPrice="item.price"
                            />
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import floorComponent from '../component/floorComponent'
import goodsInfo from '../component/goodsInfoComponent'
    export default {
        data() {
            return {
                swiperOption:{
                    slidesPerView:2,  //压缩组件直至可以在屏幕显示2个
                },
                msg: "HelloWorld",
                locationIcon: require('../../assets/images/location.png'),
                bannerPicArray:[],
                recommendGoods:[],
                floor1:[],
                floor2:[],
                floor3:[],
                floorName:{},
                hotGoods:[],
            }
        },
        //在components属性里注册组件
        components:{swiper, swiperSlide, floorComponent, goodsInfo},
        created(){
            axios({
                url:'https://www.easy-mock.com/mock/5c3f3ab2419c5d0de8845d94/example/index',
                method:'get',
            })
            .then(Response=>{
                console.log(Response)   
                if(Response.status == 200){
                    this.bannerPicArray = Response.data.data.slides;
                    this.recommendGoods = Response.data.data.recommend;
                    this.floor1 = Response.data.data.floor1;
                    this.floor2 = Response.data.data.floor2;
                    this.floor3 = Response.data.data.floor3;
                    this.floorName = Response.data.data.floorName;
                    this.hotGoods = Response.data.data.hotGoods;
                }
            })
            .catch(error=>{
                console.log(error)
            })
        }
    }
</script>

<style scoped>
.search-bar{
    height: 2.2rem;
    background-color: orange;
    line-height: 2.2rem;
    overflow: hidden;

}
.search-input{
    width: 100%;
    height: 1.3rem;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 1px solid #fff;
    background-color: orange;
    color:#fff;
}
.location-icon{
    padding-top: 0.2rem;
    padding-left:0.5rem;
}
.swiper-area{
    clear: both;
    max-height: 9rem;
    overflow: hidden;

}
.type-bar{
    background-color: #fff;
    margin:.3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.type-bar div{
    padding: .3rem;
    font-size: 12px;
    text-align: center;
}
.recommend-area{
    background-color:#fff;
    margin-top: .3rem;
}
.recommend-title{
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: .2rem;
    color:white;
    background-color: orange;
    border-radius: 0 0 10px 10px;
}
.recommend-item{
    width: 99%;
    font-size: 12px;
    text-align: center
}
.hot-area{
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
}
.hot-title{
    background-color: orange;
    border-radius: 0 0 10px 10px;
}
.hot-goods{
    height: 160rem;
    overflow: hidden;
    background-color: #fff;
}
</style>