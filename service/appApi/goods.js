const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')
let router = new Router()
//将json文件的数据写入数据库
router.get('/insertAllGoodsInfo', async(ctx)=>{
    fs.readFile('./newGoods.json', 'utf8', (err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model('Goods')
        data.map((value, index)=>{
            console.log(value)
            let newGoods = new Goods(value)
            newGoods.save().then(()=>{
                saveCount ++
                console.log('成功:'+saveCount)
            }).catch(error=>{
                console.log('失败:'+error)
            })
        })
    })
    ctx.body = "开始导入数据"
})
router.get('/insertAllCategory', async(ctx)=>{
    fs.readFile('./data_json/category.json', 'utf8', (err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value, index)=>{
            console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(()=>{
                saveCount++
                console.log('成功'+saveCount)
            }).catch(error=>{
                console.log('失败:'+error)
            })
        })
    })
    ctx.body = '开始导入数据------'
})
router.get('/insertAllCategorySub', async(ctx)=>{
    fs.readFile('./data_json/category_sub.json', 'utf8', (err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value, index)=>{
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(()=>{
                saveCount++
                console.log('成功'+saveCount)
            }).catch(error=>{
                console.log('失败:'+error)
            })
        })
    })
    ctx.body = '开始导入数据......'
})
//**获取商品详信息的接口 */
router.post('/getDetailGoodsInfo', async(ctx)=>{
    try{
        let goodsId = ctx.request.body.goodsId
        const Goods = mongoose.model('Goods')
        let result = await Goods.findOne({ID:goodsId}).exec()
        ctx.body = {code:200, message:result}
    }catch(error){
        ctx.body = {code:500, message:error}
    }
})
/**上面的代码，我们先获得了从前端得到的参数goodsId，然后得到Goods模型，用模型的findOne方法查找数据，查找出来进行返回 */

//** 读取大类物品数据
router.get('/getCategoryList',async(ctx)=>{
    try{
        const Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body={code:200,message:result}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})

//** 读取小类物品数据
router.post('/getCategorySubList',async(ctx)=>{
    try{ 
        let categoryId = ctx.request.body.categoryId   //获取大类物品id
        //let categoryId = 1
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec()
        ctx.body={code:200,message:result}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})
/**根据类别获取商品列表 */
router.post('/getCategorySubList',async(ctx)=>{
    try{
        let categorySubId = ctx.request.body.categorySubId   //获取子类物品id
        let page = ctx.request.body.page     //获取当前页面
        let num = 10                        //每页显示数量
        let start = (page-1)*num           //开始位置
        //let categorySubId = '2c9f6c946016ea9b016016f79c8e0000'
        const CategorySub = mongoose.model('Goods')
        let result = await CategorySub.find({SUB_ID:categorySubId})
        .skip(start).limit(num).exec()
        ctx.body={code:200,message:result}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})

module.exports = router