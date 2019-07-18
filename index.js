const Koa = require('koa')
const app = new Koa()
//引入connect
const fs=require('fs')                      //文件系统  读取/写入文件
const {connect, initSchemas} = require('./database/init.js')
const mongoose =require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')  //2.0.6
const Router = require('koa-router')

let router = new Router();
let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
let goods = require('./appApi/goods.js')

    //装载所有子路由
app.use(bodyParser())
app.use(cors())
router.use('/user',user.routes())
router.use('/home',home.routes())
router.use('/goods',goods.routes())

    //加载路由中间件

app.use(router.routes())
app.use(router.allowedMethods())


//立即执行函数
;(async () =>{
    await connect()
    initSchemas() 
    // const User = mongoose.model('User')              
    // let oneUser = new User({userName : 'jspang02', password: '123456'})      //插入user数据库
    // oneUser.save().then( ()=>{
    //     console.log('插入成功')
    // })
    // let user = await User.findOne({}).exec()
    // console.log('--------------------')
    // console.log(user)
    // console.log('--------------------')

})()

app.use(async(ctx)=>{
    ctx.body='<h2>Hello Koa</h2>'
})
app.listen(3000, ()=>{
    console.log('[Server] starting at port 3000.')
})