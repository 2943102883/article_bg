// 文章分类
const express = require('express');
const router = express.Router()
// 验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入验证对象
const {add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema} = require('../schema/artcate')
const artCate_handler = require('../router_handler/artcate')
// 获取文章分类列表数据
router.get('/cates', artCate_handler.getArticleCates)
// 新增文章分类
router.post('/addcates', expressJoi(add_cate_schema), artCate_handler.addArticleCates)
// 根据ID删除文章分类
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artCate_handler.deleteCateById)
// 根据ID获取文章分类
router.get('/cates/:id', expressJoi(get_cate_schema), artCate_handler.getArtCateById)
// 根据ID更新文章分类
router.post('/updatecate', expressJoi(update_cate_schema), artCate_handler.updateCateById)

module.exports = router