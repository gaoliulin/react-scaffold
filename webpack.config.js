const path = require('path')  //导入node.js 中专门操作路径的模块
const root_path = path.resolve(__dirname);

// Cannot find module 'glob'
// const glob = require('glob');

// function getEntrys(globPath) {
//     const files = glob.sync(globPath);
//     const entrys = {};
//     console.log('files', files);
//     files.forEach((filepath)=>{
//         const split = filepath.split('/');
//         const name = split[split.length-1];
//         entrys[name.toLowerCase()] = `./src/${name}/app.js`;
//     })
//     console.log('entrys', entrys);
//     return entrys;
// }
// getEntrys(root_path + '/**/app.js');
// console.log('getEntrys--', getEntrys);

const entrys = [
    path.join(__dirname,'./src/pages/page1/app.js'),
    path.join(__dirname,'./src/pages/page2/app.js'),
]
const entrys2 = {
    page1: path.join(__dirname,'./src/pages/page1/app.js'),
    page2: path.join(__dirname,'./src/pages/page2/app.js'),
}
console.log('entrys--', entrys);



module.exports = {
    // mode:'development',  // mode用来指定结构模式，可选值有development 和 production
    // entry: path.join(__dirname,'./src/pages/page1/app.js'),//打包入口文件路径
    entry: entrys2,
    output:{
        path:path.join(__dirname,'./dist'),  //输出文件存放路径
        // filename:'bundle.js'   //输出文件的名称
        filename: '[name].[contenthash].bundle.js',
    },
    module:{  //所有第三方模块匹配规则
        rules:[   //文件后缀名的匹配规则
            {test:/\.css/,use:['style-loader','css-loader']}
        ]
    }
      
}





