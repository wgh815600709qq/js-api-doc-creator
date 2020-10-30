# js-api-doc-creator

```
A simple webpack plugin for build docs which descript the apis.

It is helpful for projects to support batch-creating js api docs.
```
```
webpack 插件, 用于把批量注释生成markdown文档。
```
# plugin
[plugin link](plugin/js-api-creator.plugin.js)


# test demo script
[test script](package.json)
```
    npm run create
    npm run create-en
```

# plugin options
  |Param|Param Description|Data Type|Data Default Value|eg:|
  |:----- |:----- |:----- |:----- |:----- |
  |output|path of output|String|.doc/js-api-doc.md|.doc/doc.md|
  |vars|some key:value|Object|{arg_name: 'Param', arg_des: 'Param Description'}|{type: 'Data Type'} |
  |lang|language of doc|String|zh-cn|zh-cn/en-us|

# how to use

## Below code is the example

[build script](build/build-doc.js)
#### js-demo
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

#### webpack-config
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
#### output
[dist](dist/.doc_en-us/doc.md)

> Application
### Function Description：

      test demo function1

### Param Description：
  |Params|Param Description|Data Type|Data Default Value|Version Of Params|
  |:----- |:----- |:----- |:----- |:----- |
  |a|param a|Boolean|true|1.0|
  |v|param v|String|'x'| |

