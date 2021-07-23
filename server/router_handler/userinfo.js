const db = require('../db/index')
// 导入处理密码的模块
const bcrypt = require('bcryptjs')

// 查询用户信息
exports.getUserInfo = (req, res) => {
    const sql = 'select id, username,nickname,email,user_pic from ev_users where id = ?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if(results.length !== 1) return res.cc('获取用户信息失败')
        // 获取用户信息成功
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        })
    })
}
// 更新用户基本信息
exports.updateUserInfo = (req, res) => {
    const sql = 'update ev_users set ? where id=?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) {
            return res.cc('更新用户基本信息失败！')
        }
        res.cc('更新用户基本信息成功', 0)
    })
}
// 修改密码
exports.updatePassword = (req, res) => {
    const sql = 'select * from ev_users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) {
            return res.cc('用户不存在！')
        }
        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if(!compareResult) return res.cc('旧密码错误！')
        // 修改密码
        const sql = 'update ev_users set password=? where id=?'
        // 对新密码进行加密
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('更新密码失败！')
            res.cc('更新密码成功！', 0)
        })
    })
}
// 更新头像
exports.updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更换头像失败')
        res.cc('更换头像成功', 0)
    })
}