const joi = require('@hapi/joi')

// 标题，分类ID，内容，发布状态检验规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()

// 验证规则对象
exports.add_atricle_schema = {
    body: {
        title,
        cate_id,
        content,
        state
    }
}