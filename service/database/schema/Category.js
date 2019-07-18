/*
    Schema的建立我们已经用了好几次了，
    其实你把Schema想象成数据库collections的一个复制映射就好，
    它是和数据库里的collection对应的
*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    ID:{unique:true,type:String},
    MALL_CATEGORY_NAME:{type:String},
    IMAGE:{type:String},
    TYPE:{type:Number},
    SORT:{type:Number},
    COMMENTS:{type:String},
})

mongoose.model('Category', categorySchema)