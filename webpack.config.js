//webpack  是node 语法
let path = require('path');
let htmlWebpackPlugins = require("html-webpack-plugin");
let miniCssExtractPlugin = require('mini-css-extract-plugin');
let optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
let uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
let webpack = require("webpack");
let cleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
    optimization: {//优化
        minimizer: [
            new optimizeCssAssetsWebpackPlugin({
                cache: true,  //缓存
                parallel: true, //并发打包压缩多个
                sourceMap: true //    源码映射调试   set to true if you want JS source maps
            }),
            new uglifyjsWebpackPlugin({
                cache:true,
                parallel:true,
                sourceMap:true,
            }),
            new webpack.ProvidePlugin({
                $: 'jquery'
            })
        ]
    },
    devServer: {
        port: "8088",
        progress: true,
        contentBase: "./dist",
    },
    mode: "production",
    entry: ["./src/index.js"],
    // devtool:"source-map", //源码映射  调试
    // devtool:"eval-source-map", //源码映射  调试  产生文件  显示行和列
    // devtool:"cheap-module-source-map", //不会产生文件 集成在打包后的文件中  不会产生列 
    // devtool:"cheap-module-eval-source-map", //不会产生文件 集成在打包后的文件中   c  显示行和列
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist")
    },
    // watch:true,
    // watchOptions:{
    //     poll:1000,
    //     ignored:/node_modules/,
    //     aggregateTimeout:500,
        
    // },
    plugins: [ // 数组 放着webpack 插件
        new htmlWebpackPlugins({
            template: "./src/index.html",
            // filename:"main.html",
            minify: { //压缩
                removeAttributeQuotes: true,//删除html双引号
                collapseInlineTagWhitespace: true,//折叠空行
            },
            hash: true,//引入 时候加hash戳 缓存
        }),
        new miniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "/css/[name].css",
            chunkFilename: "[id].css"
        }),
        new cleanWebpackPlugin(),
        new webpack.BannerPlugin('make 2019 Mr.jing')
    ],

    resolve:{
        alias:{//别名

        },
        mainFields:["style","main"],   //找包的时候 找package.json
        // mainfiles:"",  //入口文件的名字
        extensions:[],// 引入文件不加后缀  会默认找什么格式的问题
    },

    //loader pre 前面执行的；loader normal 普通的loader  内联loader liader   后置loader


    module: {
        rules: [
            {
                test: /\.html/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        outputPath:'/image/'
                    },

                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, './src'),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {//css load    load希望单一   多个load需要[]    load执行顺序是  右到左
                test: /\.css$/, use: [miniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.less/, use: [miniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },

        ]
    }
} 