const webpack = require('webpack');
const JsApiCreatorPlugin = require('../plugin/js-api-creator.plugin.js');
const path = require('path');
const langStr = process.argv.slice(2).find(it => /lang\=[a-z_]+/g.test(it))
var lang = 'zh_cn'
if (langStr) {
  lang = langStr.slice(5)
  console.log(langStr, lang)
} 
const buildConfig = {
  'en_us': {
    output: '.doc_en-us/doc.md',
    vars: {
        'type': 'Data Type',
        'default': 'Data Default Value',
        'version': 'Version Of Params',
    },
    lang: 'en-us' // [zh-cn, en-us]
  },
  "zh_cn": {
    output: '.doc_zh-cn/doc.md',
    vars: {
        'type': '类型',
        'default': '默认值',
        'version': '版本',
    },
    lang: 'zh-cn' // [zh-cn, en-us]
  }
}
const webpackConfig = {
    mode: 'production',
    devtool: 'eval',
    entry: path.resolve(__dirname, '../test/demo.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    plugins: [
      new JsApiCreatorPlugin(buildConfig[lang])
    ]
};

 webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(stats.hasErrors())
    console.log(stats.toString({
      colors: 'red',
      chunks: false,
      children: false,
      modules: false
    }))
  } else {
    console.log(stats.toString({
      colors: 'green',
      chunks: false,
      children: false,
      modules: false
    }))
  }
});