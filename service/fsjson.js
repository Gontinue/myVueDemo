const fs = require('fs')  //nodejs 自带操作文件的模块
fs.readFile('./goods.json','utf8',function(err, data){  //读取文件   ‘data’是读取的数据
    let newData = JSON.parse(data)    //因为读取的data是字符串，json.parse()将字符串转成json对象。
    let i = 0
    let pushData = []
    newData.RECORDS.map(function(value, index){
        if(value.IMAGE1 !=null){
            i++
            console.log(value.NAME)
            pushData.push(value)
        }
    })
    console.log(i)
    //console.log(pushData)
    fs.writeFile('./newGoods.json', JSON.stringify(pushData), function(err){  //json.stringfy()将对象、数组转换成字符串； 
        if(err) console.log('写文件操作失败')
        else console.log('写文件操作成功')
    })
})