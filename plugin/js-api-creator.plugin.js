class JsApiCreatorPlugin {
  constructor(options) {
    const defaultOutputPath = '.doc/js-api-doc.md'
    this.output = options && options.output || defaultOutputPath
    this.lang = options && options.lang || 'zh-cn'
    this.descript = {
      func: {
        'zh-cn': '函数描述',
        'en-us': 'Function Description'
      },
      param_des: {
        'zh-cn': '参数描述',
        'en-us': 'Param Description'
      },
      param: {
        'zh-cn': '参数',
        'en-us': 'Params'
      }
    }
    this.vars = Object.assign({
      arg_name: this.descript.param[this.lang],
      arg_des: this.descript.param_des[this.lang],
    }, options.vars || {})
  }
  apply(compiler) {
    var _this = this
    compiler.plugin('emit', function (compilation, callback) {
      console.log("Plugin [js-api-doc-creator]: Begin to create docs!!!");
      const files = compilation.assets
      var content = ''
      for (var filename in files) {
        let asset = files[filename]
        let source = asset.source()
        console.log('source', source)
        let splitArr = String.prototype.match.call(source, /\/\*\*[^\/]+\/[\\r|\\n]*function[\s]+[a-zA-Z\d_]+/g)
        console.log('splitArr', splitArr)
        if (splitArr && splitArr.length) {
          splitArr.forEach(api => {
            let splitFunc = api.split(/function\s+/)
            let func_name = splitFunc[1]
            let allExplains = splitFunc[0]
            let des = {
              func_name: func_name,
              func_desc: '',
              explain: []
            }
            let explainsArray = allExplains.split('* @param {*}')
            explainsArray = explainsArray.map((item, index) => {
              let _item = item.replace(/[\/\*\/\↵]/g, '').trim()
              if (index == 0) { // func description
                des.func_desc = _item.replace(/\\r\\n/g, '')
              } else {
                let sliceIndex = _item.indexOf('@')
                let param = _item.trim()
                if (sliceIndex > -1) {
                  param = _item.slice(0, sliceIndex).trim()
                }
                let paramArr = param.split(':')
                let descript = {
                  arg_name: paramArr[0],
                  arg_des: paramArr[1].replace(/\\r\\n/g, ''),
                }
                Object.keys(_this.vars).map(key => {
                  var reg = new RegExp(`@${key}:[^@]+`, 'g')
                  let exist = _item.match(reg)
                  if (exist) {
                    let obj = {}
                    obj[key] = exist[0].slice(key.length + 2).replace(/\\r\\n/g, '').trim()
                    Object.assign(descript, obj)
                  }
                })
                des.explain.push(descript)
              }
            })
            // write ino file
            content = _this.writeTpl(content, des)
          })
        }
      }
      // output
      files[_this.output] = {
        source: function () {
          return content
        },
        size: function () {
          return content.length
        }
      }
      callback();
    });
  }

  writeTpl(content, des) {
    let _this = this;
    var top, mid;
    top = mid = '  |';
    Object.values(_this.vars).map(item => {
      top += `${item}|`;
      mid += `:----- |`;
    })
    let keyArr = Object.keys(_this.vars);
    let explains = '';
    des.explain.map(it => {
      explains += '  |'
      keyArr.map(_key => {
        let val = it[_key]
        if (val != undefined) {
          explains += `${val}|`
        } else {
          explains += ` |`
        }
      })
      explains += '\r\n'
    });
    content +=
      `> ${des.func_name}
### ${_this.descript.func[_this.lang]}：

    ${des.func_desc}

### ${_this.descript.param_des[_this.lang]}：
${top}
${mid}
${explains}`;
    content += '\r\r\r';
    return content
  }
};

module.exports = JsApiCreatorPlugin;

/* 模板
> functionName

### 函数描述：
```
    测试函数
```
### 参数说明：
| 参数 | 参数说明 |类型|默认值
| :----- | :---- |:---- |:---- |
| a | 单元格 |单元格 |单元格 |
| b | 单元格 |单元格 |单元格 |
*/