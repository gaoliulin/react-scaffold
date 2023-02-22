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
