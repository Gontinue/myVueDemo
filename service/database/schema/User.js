const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')  //加盐加密第三方库
const SALT_WORK_FACTOR = 10  //加盐强度

//创建UserSchema
const userSchema = new Schema({
    UserId :{type:ObjectId},
    userName : {unique:true, type:String},
    password : String,
},{
    collection: 'user'
})  
//加盐加密
userSchema.pre('save', function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR,(err, salt)=>{     //回调函数
        if(err) return next(err)        //如果有错误
        bcrypt.hash(this.password, salt, (err, hash)=>{   //回调函数
            if(err) return next(err)   //如果有错误
            this.password = hash
            next()
        })
    })
})
//声明的一个实例方法，将登录密码进行对比
userSchema.methods = {
    comparePassword:(_password, password)=>{
        return new Promise((resolve, reject)=>{
            bcrypt.compare(_password, password, (err, isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}
//发布模型
mongoose.model('User', userSchema)
