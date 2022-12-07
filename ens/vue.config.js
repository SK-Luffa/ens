
// 引入gzip压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin')



const compress = new CompressionWebpackPlugin({
    filename: info => {
        return `${info.path}.gz${info.query}`
    },
    algorithm: 'gzip',
    threshold: 1024,
    // test: new RegExp('\\.(' +['js'].join('|') +')$'),
    test: /\.(js|css|svg|woff|ttf|json|html)$/,
    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
    deleteOriginalAssets: false // 删除原文件
})


module.exports = {
    productionSourceMap: false,
   
    lintOnSave: false,
  
    publicPath: '/', //部署应用包时的基本 URL。
    devServer: {
        proxy: {
            // '/v3': {
            //     target: 'httpss://api.omnisend.com',
            //     // target: 'https://localhost:8823',
            //     secure: false,
            //     changeOrigin: true, //是否跨域
            //     pathRewrite: {
            //         '^/v3': '/v3'
            //     }

            // },
            '/uploads': {
                target: 'http://47.251.7.2',
                // target: 'https://localhost:8823',
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/uploads': '/uploads'
                }

            },
            '/api': {
                target: 'http://47.251.7.2',
                // target: 'https://localhost:8823',
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/api': '/api'
                }
            },
           
            '/uploads': {
                target: 'http://47.251.7.2',
                // target: 'https://localhost:8823',
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/uploads': '/uploads'
                }
            },
            '/img_sketch': {
                target: 'http://47.251.7.2',
                // target: 'https://localhost:8823',
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/img_sketch': '/img_sketch'
                }
            }
        },
        host: 'localhost', //
        port: 8080, //
        // before (app, server) {
        //     app.get(/.*.(js)$/, (req, res, next) => {
        //         req.url = req.url + '.gz'
        //         res.set('Content-Encoding', 'gzip')
        //         next()
        //     })
        // }
    },
    // chainWebpack: config => {
    //     // 配置cdn引入
    //     config.plugin('html').tap(args => {
    //         args[0].cdn = cdn
    //         return args
    //     })
    //
    //     // 移除prefetch插件，避免加载多余的资源
    //     config.plugins.delete('prefetch')
    //
    //
    //     // 定义文件夹的路径
    //     // config.resolve.alias
    //     //     .set('@', resolve('src'))
    //     //     .set('assets', resolve('src/assets'))
    //     //     .set('components', resolve('src/components'))
    //     //     .set('router', resolve('src/router'))
    //     //     .set('store', resolve('src/store'))
    //     //     .set('views', resolve('src/views'))
    //
    //     // 压缩图片
    //     const imagesRule = config.module.rule('images')
    //     imagesRule.uses.clear()
    //     imagesRule.use('file-loader')
    //         .loader('url-loader')
    //         .options({
    //             limit: 10240,
    //             fallback: {
    //                 loader: 'file-loader',
    //                 options: {
    //                     outputPath: 'static/images'
    //                 }
    //             }
    //         })
    //
    //
    //     // 压缩响应的app.json返回的代码压缩
    //     config.optimization.minimize(true)
    // },
    chainWebpack(config) {
        config.plugins.delete('prefetch');//默认开启prefetch(预先加载模块)，提前获取用户未来可能会访问的内容 在首屏会把这十几个路由文件，都一口气下载了 所以我们要关闭这个功能模块
        if (process.env.NODE_ENV !== 'development') {
            // 对超过10kb的文件gzip压缩
            config.plugin('compressionPlugin').use(
                new CompressionWebpackPlugin({
                    test: /\.(js|css|html)$/,// 匹配文件名
                    threshold: 10240,
                })
            );
        }
    },
    configureWebpack: {
        devtool: "cheap-module-source-map",
        //     resolve: {
        //         alias: {
        //             'src': resolve('src')
        //         }
        //     },
        //     // 通过 compression-webpack-plugin 插件对js文件进行gzip压缩
        //     plugins: [compress]
    },
    // "configureWebpack": config => {
    //     // config.optimization = {
    //     //     minimize: process.env.NODE_ENV === 'production',
    //     //     minimizer: [
    //     //         new TerserPlugin({
    //     //             test: /\.js(\?.*)?$/i, // 匹配参与压缩的文件
    //     //             parallel: true, // 使用多进程并发运行
    //     //             terserOptions: {
    //     //                 // Terser 压缩配置
    //     //                 output: { comments: false }
    //     //             },
    //     //             extractComments: false // 将注释剥离到单独的文件中
    //     //         })
    //     //     ]
    //     // },
    //
    //     // 忽略打包配置
    //     config.externals = cdn.externals
    //
    //
    //     if (process.env.NODE_ENV === 'production') {
    //
    //         config.plugins.push(
    //             new TerserPlugin({
    //                 terserOptions: {
    //                     ecma: undefined,
    //                     warnings: false,
    //                     parse: {},
    //                     compress: {
    //                         drop_console: true,
    //                         drop_debugger: false,
    //                         pure_funcs: ['console.log'] // 移除console
    //                     }
    //                 }
    //             })
    //         )
    //     }
    //
    //     // 开启gzip压缩
    //     config.plugins.push(
    //         new CompressionWebpackPlugin(
    //             {
    //                 filename: info => {
    //                     return `${info.path}.gz${info.query}`
    //                 },
    //                 algorithm: 'gzip',
    //                 threshold: 0, // 只有大小大于该值的资源会被处理 10240
    //                 test: new RegExp('\\.(' + ['js'].join('|') + ')$'
    //                 ),
    //                 minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
    //                 deleteOriginalAssets: false // 删除原文件
    //             }
    //         )
    //     )
    //
    //
    //     // 展示打包图形化信息
    //    // config.plugins.push(
    //    //     new BundleAnalyzer()
    //    // );
    //
    //     // 公共代码抽离
    //     config.optimization = {
    //         splitChunks: {
    //             cacheGroups: {
    //                 vendor: {
    //                     chunks: 'all',
    //                     test: /node_modules/,
    //                     name: 'vendor',
    //                     minChunks: 1,
    //                     maxInitialRequests: 5,
    //                     minSize: 0,
    //                     priority: 100
    //                 }
    //             }
    //         }
    //     }
    //
    // },
    // css: {
    //     extract: true,
    //         sourceMap: false,
    //         loaderOptions: {
    //         // 定义全局scss无需引入即可使用
    //         sass: {
    //             prependData: `
    //               @import "@/assets/css/variable.scss";
    //               @import "@/assets/css/common.scss";
    //               @import "@/assets/css/mixin.scss";
    //             `
    //         }
    //     }
    // },

}

