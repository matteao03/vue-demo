const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/vue-mobile'
    : '/',
	devServer: {
        port: 8080, // 端口号
        host: 'localhost',
        proxy: {
            '/api': {
                target: 'http://192.168.XX.XXX/',   //设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true,  // 是否跨域
                pathRewrite: {
                    '^/api': ''  //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'https://api.douban.com/user/add'，直接写‘/api/user/add’即可，此处的‘api’可以设置为自己想要设置的任何词语，符合规范即可
                }
            }
        },
    },
    css: {
        loaderOptions: {
          sass: {
            data: `
              @import "@/assets/styles/_variable.scss";
            `
          },
          postcss: {
            plugins: [
              autoprefixer(),
              pxtorem({
                rootValue: 37.5,
                propList: ['*']
              })
            ]
          }
        }
    }
}