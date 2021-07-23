// 导入定义验证规则的模块
const joi = require('@hapi/joi')

// 定义name和alias的验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// id的校验规则
const id = joi.number().integer().min(1).required()



exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}

exports.delete_cate_schema = {
    params: {
        id
    }
}
exports.get_cate_schema = {
    params: {
        id
    }
}
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias
    }
}