// 文章处理
const path = require('path')
const db = require('../db/index')

// 发布文章
exports.addArticle = (req, res) => {
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('缺少文章封面')
    const articleInfo = {
        ...req.body,
        // 文章封面的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章的发布时间
        pub_date: new Date(),
        author_id: req.user.id
    }
    const sql = 'insert into ev_articles set ?'
    db.query(sql, articleInfo, (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRow !== 1) return res.cc('发布新文章失败！')
        res.cc('发布文章成功', 0)
    })
}