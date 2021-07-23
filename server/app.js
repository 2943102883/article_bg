const express = require('express');
const app = express();
const cors = require('cors');
const joi = require('@hapi/joi')
// CORS
app.use(cors());
// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))
// 托管静态资源
app.use('/uploads', express.static('./uploads'))
// 封装res.send为res.cc函数
app.use((req, res, next) => {
    res.cc = (err, status=1) => {
        // status默认为1，表示失败
        // err的值可能是个对象也可能是个描述错误的字符串
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
})
// 配置解析Token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

// 导入并使用user.js用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并使用用户信息的路由模块
const userinfo = require('./router/userinfo')
app.use('/my', userinfo)
// 文章分类
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)
// 文章处理
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)


// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 密码验证失败
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    // Token身份认证
    if (err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败！')
    }
    // 未知的错误
    res.send(err)
})

// 启动服务器
app.listen(8080, () => {
    console.log('api server running at http://localhost:8080');
})