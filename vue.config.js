function publicPath(){
    if (process.env.NODE_ENV == 'production') {
        return "././";
    } else {
        return "/";
    }
}

module.exports = {
	transpileDependencies: true,
	publicPath: publicPath(),
	devServer: {
		host: '127.0.0.1',
		port: 3001, // 端口
		hot: true, // 开启热更新
        https: false, // 是否开启https模式
	},
	/* 修改html标题 */
	chainWebpack: config => {
		config.plugin('html')
			.tap(args => {
				args[0].title = "金融投资管理系统";
				return args;
			})
	},
}
