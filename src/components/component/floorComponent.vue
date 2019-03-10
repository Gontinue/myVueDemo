<template>
    <div>
        <div class="floor">
            <div class="floor-title">{{floorTitle}}</div>
            <div class="floor-normaly">
                <div class="floor-one">
                    <img :src="floorData0.image" width="100%">
                </div>
                <div>
                    <div class="floor-two">
                        <img :src="floorData1.image" width="100%">
                    </div>
                    <div class="floor-two">
                        <img :src="floorData2.image" width="100%">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        //使用绑定属性的形式传入需要的值
        props:['floorData', 'floorTitle'],
        data(){
            return {
                floorData0: {},
                floorData1: {},
                floorData2: {}
            }
        },
        //入watch属性来监听传递过来值的变化
        watch:{
            floorData:function(value){
                //console.log(floorData);
                this.floorData0 = this.floorData[0],
                this.floorData1 = this.floorData[1];
                this.floorData2 = this.floorData[2];                
            }
        }
    }
</script>

<style scoped>
.floor-title{
    background-color: orange;
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
    border-radius: 0  0 10px 10px;
}
.floor-normaly{
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom: 1px solid orange;
}
.floor-normaly div{
    width: 10rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.floor-one{
    border-right: 1px solid orange;
}
.floor-two:nth-child(1){
    border-bottom: 1px solid orange;
}
</style>