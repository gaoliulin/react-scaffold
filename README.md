# react-scaffold

搭建脚手架

---

theme: fancy
---

[从零配置webpack 4+react脚手架](https://github.com/vortesnail/blog)

## 1. 新建文件夹 my-react-app1

## 2. `npm init` 或  `npm init -y` 初始化项目

生成package.json 文件
[配置说明](https://juejin.cn/post/7145001740696289317)

## 3.安装 `webpack` `webpack-cli`

```
npm install --save-dev webpack webpack-cli
```

接下来，我们在根目录下新建一个文件夹名为 `config` 用于存放配置文件，在此文件夹下创建一个 `.js` 文件名为 `webpack.common.config.js` ，敲入以下代码：

```
const path = require('path');

module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
}
```

`entry` 属性定义了入口文件路径， `output` 定义了编译打包之后的文件名以及所在路径。  
这段代码的意思是告诉webpack，入口文件是 `src` 目录下的 `app.js` 文件。打包输出的文件名字为 `bundle.js` ，保存在上一级目录下的 `dist` 文件夹中。

回到我们之前创建的 `app.js` 文件，输入代码：

```
var root =document.getElementById('root');
root.innerHTML = 'hello, webpack!';
```

在根目录下创建一个文件夹名为： `public` ，再新建一个html文件，名为： `index.html` ，以下内容：

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>从零配置webpack4+react脚手架</title>
</head>
<body>
  <div id="root"></div>
  <script src="../dist/js/bundle.js"></script>
</body>
</html>
```

现在的目录结构是这样子（只要不编译打包，要引入的 `bundle.js` 就没有）

```
 my-react-app1
   |- config
      |- webpack.common.config.js
      |- webpack.prod.config.js
      |- webpack.dev.config.js
   |- node_modules
+  |- public
+     |- index.html
   |- src
      |- app.js
   |- package.json
```

```
npm run build
```

我们可以看到，webpack重新进行了编译，这和执行

### 4. 安装React

在控制台输入以下代码：

```
npm install --save react react-dom
```

安装完成之后，我们就可以写react的JSX语法了。

这里为了和react官方脚手架 `create-react-app` 的目录结构相类似，我们在 `src` 文件夹下新建一个js文件， `index.js` ，用于渲染根组件。

在 `index.js` 输入以下代码：

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

并用jsx语法重写 `app.js` ：

```
import React from 'react';

function App() {
  return (
    <div className="App">Hello World</div>
  );
}

export default App;
```

对 `webpack.common.config.js` 文件中的入口进行修改，因为我们现在要编译打包的应该 `index.js` ：

```
  const path = require('path');

  module.exports = {
    entry: {
-     app: './src/app.js',
+     index: './src/index.js',
    },
    output: {
      filename: 'js/bundle.js',
      path: path.resolve(__dirname, '../dist')
    }
  }
```

此时 npm run  build 打包不成功，因为识别不了jsx 语法


### 5. 使用babel 7

为什么我们上面写jsx会打包不了呢，因为webpack根本识别不了jsx语法，那怎么办？使用loader对文件进行预处理。  
其中，babel-loader，就是这样一个预处理插件，它加载 ES2015+ 代码，然后使用 Babel 转译为 ES5。那开始配置它吧！

首先安装babel相关的模块：

```
npm install --save-dev babel-loader @babel/preset-react @babel/preset-env @babel/core
```

- **babel-loader：**使用Babel和webpack来转译JavaScript文件。
- **@babel/preset-react：**转译react的JSX
- **@babel/preset-env：**转译ES2015+的语法
- **@babel/core：**babel的核心模块

理论上我们可以直接在 `webpack.common.config.js` 中配置"options"，但最好在当前根目录，注意，一定要是根目录！！！ 新建一个配置文件 `.babelrc` 配置相关的"presets"：

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          // 大于相关浏览器版本无需用到 preset-env
          "edge": 17,
          "firefox": 60,
          "chrome": 67,
          "safari": 11.1
        },
        // 根据代码逻辑中用到的 ES6+语法进行方法的导入，而不是全部导入
        "useBuiltIns": "usage"
      }
    ],
    "@babel/preset-react"
  ]
}
```

这里有关[bebel的配置](https://www.babeljs.cn/docs/babel-preset-env)可上官网查询文档。

再修改 `webpack.common.config.js` ，添加如下代码：

```
const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  }
}
```











自动编译html并引入js文件
public的index.html应该自动编译到dist目录，并且所有的js引用是自动添加的。你可以使用html-webpack-plugin插件来处理这个优化。

安装HtmlWebpackPlugin
在控制台执行以下代码：

npm install --save-dev html-webpack-plugin
在webpack.prod.config.js中配置plugins属性
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // 这里有小伙伴可能会疑惑为什么不是 '../public/index.html'
      // 我的理解是无论与要用的template是不是在一个目录，都是从根路径开始查找
      template: 'public/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    })
  ]
});
filename：打包之后的html文件名字
template：以我们自己定义的html为模板生成，不然我们还要到打包之后的html文件中写
inject：在body最底部引入js文件，如果是head，就是在head中引入js
minify：压缩html文件，更多配置点我
 removeComments：去除注释
collapseWhitespace：去除空格
更多配置请点击官方README

删除index.html中手动引入的script标签
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>从零配置webpack4+react脚手架</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
现在我们再来打包试试，看看dist中是不是多出了html文件，并且自动引入了script，用浏览器打开它试试看是不是能正确输出内容了！

给打包出的js文件换个不确定名字
这个操作是为了防止因为浏览器缓存带来的业务代码更新，而页面却没变化的问题，你想想看，假如客户端请求js文件的时候发现名字是一样的，那么它很有可能不发新的数据包，而直接用之前缓存的文件，当然，这和缓存策略有关。

那我们怎么给导出文件的安排一个不确定的名字呢？很简单，[hash]或[chunkhash]
修改webpck.prod.config.js：

const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash:8].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    })
  ]
});
其中，name就是模块名称，我们在entry中进行过配置，在这里重新设置会代替之前common中的设置，chunkhash是文件内容的hash，webpack默认采用md5的方式对文件进行hash。8是hash的长度，如果不设置，webpack会设置默认值为20。

现在你重新打包，去看看生成的js文件的名字～

打包编译前清理dist目录
在上面的修改后，因为js文件名字不同，你之后再打包，会把之前打包之后的js文件也留下，我们只想要最新打包编译的文件，就需要先清除dist目录，再重新生成。

安装clean-webpack-plugin
npm install --save-dev clean-webpack-plugin
这个插件不被官方文档所收录，可以去github查看它的配置文档

使用clean-webpack-plugin
修改webpck.prod.config.js：

const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash:8].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new CleanWebpackPlugin()
  ]
});
这里需要注意：之前引入CleanWebpackPlugin的写法是
const CleanWebpackPlugin = require('clean-webpack-plugin'); 
而且在下面new的时候需要传入参数，dist文件路径。但是现在必须这样引入：
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
而且，不用再写路径参数

现在再来执行看看，是不是只有一个js文件了！～

代码分割
我们先看下，我们之前打包编译的时候，控制台的信息：
image.png
我们看到，这个打包之后的bundle.js文件大小为129kb，随着业务代码越来越多，这个包会变得越来越大，你每次修改了代码并发布，用户都需要重新下载这个包，但是想想看，我们修改的代码只是整个代码的一小部分，还有许多其他不变的代码，例如 react 和 react-dom ，那我们把这部分不变的代码单独打包。

修改 webpack.common.config.js ，增加一个入口：

  entry: {
    index: './src/index.js',
    framework: ['react','react-dom'],
  },
重新打包，发现react和react-dom 被编译成framework.js，但是我们的index.bundle.js还是129kb，没有变过。
这是因为我们还没有抽离index.js中的公共代码。

webpack3版本是通过配置CommonsChunkPlugin插件来抽离公共的模块。webpack4版本，官方废弃了CommonsChunkPlugin，而是改用配置optimization.splitChunks的方式，更加方便。

添加代码至 webpack.prod.config.js ：

module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      cacheGroups: {
        framework: {
          test: "framework",
          name: "framework",
          enforce: true
        },
        vendors: {
          priority: -10,
          test: /node_modules/,
          name: "vendor",
          enforce: true,
        },
      }
    }
  },
  //...
};
cacheGroups对象，定义了需要被抽离的模块，其中test属性是比较关键的一个值，他可以是一个字符串，也可以是正则表达式，还可以是函数。如果定义的是字符串，会匹配入口模块名称，会从其他模块中把包含这个模块的抽离出来。name是抽离后生成的名字，和入口文件模块名称相同，这样抽离出来的新生成的framework模块会覆盖被抽离的framework模块，虽然他们都叫framework。
vendors这个缓存组，它的test设置为 /node_modules/ 表示只筛选从node_modules文件夹下引入的模块，所以所有第三方模块才会被拆分出来。

重新打包，我们发现index.bundle.js文件大小只有：1.69kb
image.png
我们随意修改一下app.js中的内容，比如

import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>I am changed</h1>
    </div>
  );
}

export default App;
再打包一次，你会发现index.bundle.js（不被缓存）的hash值变了，但是freamework.bundle.js（能被缓存）的hash值没变，成了成了！！

压缩JS文件
我们需要把打包生成的js文件尽可能压缩，以便减少文件体积，更快地被用户加载。
我们需要一个插件： uglifyjs-webpack-plugin 来做这份工作

安装uglifyjs-webpack-plugin
在控制台执行以下代码：

npm install uglifyjs-webpack-plugin --save-dev
引入uglifyjs-webpack-plugin
增加如下代码至 webpack.prod.config.js ：

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
optimization内配置minimizer参数
minimizer: [
  new UglifyJsPlugin(),
	//...
],
现在optimization参数应该是现在这样：

  optimization: {
    minimizer: [new UglifyJsPlugin()],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      cacheGroups: {
        framework: {
          priority: 100,
          test: "framework",
          name: "framework",
          enforce: true
        },
        vendors: {
          priority: -10,
          test: /node_modules/,
          name: "vendor",
          enforce: true,
        },
      }
    }
  },
重新打包编译看看～我们的index.bundle.js减少了0.1kb，当然，随着业务代码越来越多，这部分差距会渐渐变大。

自动编译打包
我们每次修改代码，查看结果都要经历以此 npm run build ，大大降低了开发效率，这难以忍受！
webpack给我们提供了devServer开发环境，支持热更新，相当舒服。

安装webpack-dev-server
在控制台执行以下代码：

npm install webpack-dev-server --save-dev
增加代码至 webpack.dev.config.js ：
是不是都快忘记这个之前创建的配置文件了？没关系，反正也没代码，它是专门用来配置我们开发环境的

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:8].bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    port: 9000,
    compress: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
HotModuleReplacementPlugin是webpack热更新的插件，设置devServer.hot为true，并且在plugins中引入HotModuleReplacementPlugin插件即可。
还需要注意的是我们开启了hot，那么导出不能使用chunkhash，需要替换为hash。

修改我们的package.json
像之前build的时候，我们是通过配置package.json做到的，现在我们同样加入以下代码来模拟：

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config ./config/webpack.prod.config.js",
+   "start": "webpack-dev-server --inline --config ./config/webpack.dev.config.js"
  },
接下来，在控制台执行

npm run start
是不是自动开了一个端口为9000的网页，上面是我们写的页面内容，这和我们的配置都是一一对应的。
现在你随意修改app.js中的代码，再回到页面看下是不是也跟着变了，那我们就整合webpack-dev-server成功！







