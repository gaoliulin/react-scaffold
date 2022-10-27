# react-scaffold
搭建脚手架


#1.webpack, webpack-cli 可基础运行build

#2.html-webpack-plugin , clean-webpack-plugin
##html-webpack-plugin主要有两个作用：
###1.为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
###2.可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
##clan-webpack-plugin主要作用：
###1.在每次构建前清理 /dist 文件夹

#3.添加 cross-env，配置环境变量， 更新webpack.config.js 配置

# add react react-dom , babel-loader @babel/core @babel/preset-env  @babel/preset-react @babel/plugin-transform-runtime 
##配置