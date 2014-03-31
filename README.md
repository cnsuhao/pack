超级简单的浏览器模块 CMD 封装，含打包工具（基于 Nodejs）。<strong>使用方式，请参考 example 目录下的示例</strong>



开发
====
引入
```html
<script src="browser.js"></script>
```
即可在代码中使用下面语法定义和使用模块：
```javascript
define(function(require,exports,module){ // 参数均可选
    // 仅支持 module.exports 
    var bbb = require('/aaa/bbb.js'); // 加载其他模块（最好使用绝对路径）
    bbb.something();
    // ... 
});
```
	
打包
====
使用下面命令行打包模块：（你可能需要更改 pack.bat 或 pack.js 中关于 node 路径的代码）
> pack ``[入口文件.js]`` ``[根目录]``

example 中示例打包：
```
.\bin\pack.bat example/index.js example
```
或
```
./bin/pack.js example/index.js example
```
命令输出：
> D:\data\htdocs\pack\example/index.pack.js
DONE

或
> /data/htdocs/pack/example/index.pack.js
DONE

打包后的 *.pack.js 文件不依赖上面的 browser.js 直接引入最终页面即可使用。



