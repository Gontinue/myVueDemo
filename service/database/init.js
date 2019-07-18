const mongoose = require('mongoose')
const db = "mongodb://localhost/smile-db"
//mongoose.connect('mongodb://user:pass@localhost:port/database');
const glob = require('glob')
const {resolve} = require('path') //把相对路径转化为绝对路径

exports.initSchemas = () =>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)  //把schema文件下的所有js文件引入
}
 
exports.connect = () =>{
    //连接数据库
    mongoose.connect(db)
    let maxConnectTimes = 0;
    return new Promise((resolve, reject)=>{
        //增加数据库监听事件
        mongoose.connection.on('disconnected', ()=>{
            console.log('********数据库断开********')
            if(maxConnectTimes <= 3){
                mongoose.connect(db);
                maxConnectTimes++;
            }else{
                reject();
                throw new Error('数据库已断开连接......')
            }

        })
        mongoose.connection.on('error', (err)=>{
            console.log('********数据库错误********')
            if(maxConnectTimes <= 3){
                mongoose.connect(db);
                maxConnectTimes++;
            }else{
                reject(err);
                throw new Error('数据库初现错误......')
            }
        })
        mongoose.connection.once('open', ()=>{
            console.log('MongoDB connected Successfully!')
            resolve()
        })
    })

}