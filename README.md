# js-api-doc-creator

## 关于插件 [About Plugin]:
```
A simple webpack plugin for build docs which descript the apis.

It is helpful for projects to support batch-creating js api docs.
```
```
一个简易的webpack 插件, 用于把批量js文件注释，类似如下格式
  /**
  * test demo function1
  * @param {*} a:param a @type: Boolean  @default:true  @version: 1.0
  * @param {*} v:param v @type: String  @default: 'x'
  */
解析生成markdown文档
```

## 如何使用 [How To Use]
```
  npm install js-api-document-creator
```


## 测试命令 [test script]

参考此Demo的build/build-doc.js

take the demo's file as Example, Path[build/build-doc.js]

```
    npm run create
    npm run create-en
```

# 参数配置[plugin options]
  |Param|Param Description|Data Type|Data Default Value|eg:|
  |:----- |:----- |:----- |:----- |:----- |
  |output|path of output|String|.doc/js-api-doc.md|.doc/doc.md|
  |vars|some key:value|Object|{arg_name: 'Param', arg_des: 'Param Description'}|{type: 'Data Type'} |
  |lang|language of doc|String|zh-cn|zh-cn/en-us|


> Demo

>> js-demo.js
```
/**
 * test demo function1
 * @param {*} a:param a @type: Boolean  @default:true  @version: 1.0
 * @param {*} v:param v @type: String  @default: 'x'
 */
function Application(a, v) {
    console.log(a, v)
}
```

>> webpack-config.js
```
{
    mode: 'production',
    devtool: 'eval',
    entry: path.resolve(__dirname, '../test/demo.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    plugins: [
      new JsApiCreatorPlugin({
        output: '.doc_en-us/doc.md',
        vars: {
            'type': 'Data Type',
            'default': 'Data Default Value',
            'version': 'Version Of Params',
        },
        lang: 'en-us'
      })
    ]
}
```


> 产出[Output]

>> 输入文档默认路径[output docs defaultPath]

```
  dist/.doc_en-us/doc.md
```

>> 输出文档内容[output content]

### Function Description：

      test demo function1

### Param Description：
  |Params|Param Description|Data Type|Data Default Value|Version Of Params|
  |:----- |:----- |:----- |:----- |:----- |
  |a|param a|Boolean|true|1.0|
  |v|param v|String|'x'| |



> 老铁停一下[Wait a minute]

>> 如果它对你有帮助，请我喝一杯咖啡吧

![Image text](https://github.com/wgh815600709qq.com/js-api-doc-creator/master/images/wxpay.png)

>> if it helps you, please donate me a coffee by alipay

![Image text](https://github.com/wgh815600709qq.com/js-api-doc-creator/master/images/alipay.png)
