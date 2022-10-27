const path = require('path')  //导入node.js 中专门操作路径的模块




module.exports = {
    // mode:'development',  // mode用来指定结构模式，可选值有development 和 production
    entry: path.join(__dirname,'./src/pages/page1/app.js'),//打包入口文件路径
    output:{
        path:path.join(__dirname,'./dist'),  //输出文件存放路径
        filename:'bundle.js'   //输出文件的名称
    },
    module:{  //所有第三方模块匹配规则
        rules:[   //文件后缀名的匹配规则
            {test:/\.css/,use:['style-loader','css-loader']}
        ]
      }
      
}





