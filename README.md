# article_bg
![](https://img.shields.io/badge/build-pass-brightgreen)![](https://img.shields.io/badge/version-v1.0.0-blue)

## 介绍

基于layui&amp;express的文章后台管理系统。用的技术不多，适合练手

## 安装

> client： 前端
>
> server： 后端

```shell
// 前端
下载vscode的express插件在任意端口运行
// 后端
npm init
nodemon app.js
// nodemon app.js如果提示没有的话
npm init nodemon
```



## 目录结构

```shell
server
├─ db -- 数据库配置文件
├─ node_modules -- node包存储位置
├─ router -- 路由存放位置
├─ router_handler -- 具体功能实现
├─ schema -- 验证规则
├─ uploads -- 图片存储路径
├─ app.js -- 程序主入口
├─ config.js -- 全局配置文件
```



## 技术选型

### 前端技术

- echart
- jQuery
- ajax
- layUI

### 后端技术

- node
- express
- cors跨域
- mysql
- bycryptjs密码加密
- joi规则验证
- jwt加密token



## 项目截图

![登录](https://raw.githubusercontent.com/2943102883/article_bg/main/imgs/%E7%99%BB%E5%BD%95.png)

![主页](https://raw.githubusercontent.com/2943102883/article_bg/main/imgs/%E4%B8%BB%E9%A1%B5.png)

![类别](https://raw.githubusercontent.com/2943102883/article_bg/main/imgs/%E7%B1%BB%E5%88%AB.png)

![富文本](https://raw.githubusercontent.com/2943102883/article_bg/main/imgs/%E5%AF%8C%E6%96%87%E6%9C%AC.png)



## 说明

由于个人能力有限，所以应用的代码在有些地方设计可能存在不合理，代码也显得臃肿，同时用户体验、应用流畅性、代码健壮性和可扩展性还有待改进。欢迎大家指正。