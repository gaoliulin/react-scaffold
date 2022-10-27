const path = require('path')  //导入node.js 中专门操作路径的模块
const root_path = path.resolve(__dirname);
const HtmlWebPckPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


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
    index: path.join(__dirname,'./src/pages/index/app.js'),
    page1: path.join(__dirname,'./src/pages/page1/app.js'),
    page2: path.join(__dirname,'./src/pages/page2/app.js'),
}
console.log('entrys--', entrys);


const isDev = process.env.NODE_ENV ==='development'

let config = {
    mode:'development',  // mode用来指定结构模式，可选值有development 和 production
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
    },
    plugins:[
        // new CleanWebpackPlugin(),
        new HtmlWebPckPlugin({
            title: '测试title属性', 
            filename: './index.html', 
            template: 'public/index.html',
            chunks: ['index'], 
            inject: 'body',
        }),
        new HtmlWebPckPlugin({
            title: '测试title属性', 
            filename: './page1.html', 
            template: 'public/index.html',
            chunks: ['page1'], 
            inject: 'body',
        }),
        new HtmlWebPckPlugin({
            title: '测试title属性', 
            filename: './page2.html', 
            template: 'public/index.html',
            chunks: ['page2'], 
            inject: 'body',
        })
    ],
      
}

if (isDev) {
    // config.devtool =“＃廉价模块-EVAL-源映射”//代码映射
    config.devServer = {
        static: {
        //   directory: path.join(__dirname,'public'),
          directory: path.join(__dirname,'dist/src'),
        },
        compress: true,
        // 开启服务器时，顺便打开浏览器
        open: true,
        // 开启服务器时，设置端口
        port: 9000,
        /**
         * 开启 Hot Module Replace 模块热更新
         * 此配置还需要对 plugins 进行额外配置，配置如下
         * 模块热更新的作用是在开发中，修改样式文件时不会造成文件重新被打包刷新
         * 大大方便了开发者中开发中对样式的调试
         */
        // hot: true,
        // proxy: {
        //     '/api': 'http://127.0.0.1:5000'
        // },
    };
    // config.plugins.push(
    //     new webpack.HotModuleReplacementPlugin(),
    //     new webpack.NoEmitOnErrorsPlugin()//热更相关插件
    // )
}






module.exports = config;
