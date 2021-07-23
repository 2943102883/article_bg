// 文章路由模块
const express = require('express');
const router = express.Router();
// 导入表单解析包multer
const multer = require('multer');
const path = require('path');

// 验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入验证规则对象
const {add_atricle_schema} = require('../schema/article')

// 创建multer实例
const uploads = multer({dest: path.join(__dirname, '../uploads')})

const article_handler = require('../router_handler/article');

router.post('/add', uploads.single('cover_img'), expressJoi(add_atricle_schema), article_handler.addArticle)



module.exports = router;