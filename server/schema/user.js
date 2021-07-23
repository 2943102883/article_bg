// 导入验证规则的包
const joi = require('@hapi/joi')

// 用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// id,nickname, email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// 头像的验证规则： 需要时base64格式的图片
const avatar = joi.string().dataUri().required()

// 定义验证注册和登录表单的规则
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}
// 更新用户基本信息的规则
exports.update_userinfo_schema = {
    // 对req.body里面的数据进行验证
    body: {
        id,
        nickname,
        email
    }
}
// 更新密码
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}
// 头像是base64格式的
exports.update_avatar_schema = {
    body: {
        avatar
    }
}