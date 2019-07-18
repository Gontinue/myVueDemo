//模块
const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()
router.get('/',async(ctx)=>{
    ctx.body = "这是用户操作首页"
})

//注册
router.post('/register',async(ctx)=>{
    //console.log(ctx.request.body)
    //ctx.body = ctx.request.body

    const User = mongoose.model('User')         //把数据库‘User’引入进来
    let newUser = new User(ctx.request.body)   //new一个对象接收前台数据
    await newUser.save().then(()=>{           //保存到数据库
        ctx.body = {
            code : 200,                       //成功
            message : '注册成功'
        }
    }).catch(error=>{
        ctx.body={
            code : 500,                       //异常
            message : error
        }
    })

})
//登录
router.post('/login',async(ctx)=>{
    //得到前端传过来的数据
    let loginUser = ctx.request.body
    console.log(loginUser);
    let userName = loginUser.userName;
    let password = loginUser.password;

    //引入User的model
    const User = mongoose.model('User')
    //查找用户名是否存在，如果存在开始比对密码   exec()检索正则表达式
    await User.Q    ({userName:userName}).exec().then(async(result)=>{   
        console.log(result)
        if(result){
            let newUser = new User()   //因为是实例方法，所以要new出对象，才能调用
            //当用户名存在，比对密码
            await newUser.comparePassword(password,result.password)
            .then(isMatch=>{
                ctx.body = {code: 200, message: isMatch}
            })
            .catch(error=>{
                //出现异常，返回异常
                console.log(error)
                ctx.body = {code: 500, message: error}
            })
        }else{
            ctx.body = {code: 200, message: '用户名不存在'}
        }
    }).catch(error=>{
        console.log(error)
        ctx.body = {code: 500, message: error}
    })
})
module.exports=router  //es6  模块暴露出去