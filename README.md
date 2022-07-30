# vitoMusic

尚硅谷云音乐练习：  
基于原代码，修复了部分api，同步更新最新的网易云音乐后台api服务  

## 依赖后台api

[Binaryify/NeteaseCloudMusicApiPublic](https://github.com/Binaryify/NeteaseCloudMusicApi)  
[文档地址](https://binaryify.github.io/NeteaseCloudMusicApi/#/)
克隆上述仓库本地启动后在，utils目录中config.ts文件中配置对应ip和端口即可

issues:  
接口超时：部分接口请求频次过高可能会超时，稍等片刻即可访问。  
video页面无内容：video页面内容需要登录才能获取，可在个人中心点击登录后获取到video页面内容  
