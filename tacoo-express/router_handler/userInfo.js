const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 获取用户信息
exports.getUserInfo = (req, res) => {
    const sql = `select id, username, email, user_picture from user where id=?`
    db.query(sql, req.user.id, (err, results) => {
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('获取用户信息失败!')
        res.send({
            status: 0,
            message: '获取用户基本信息成功!',
            data: results[0]
        })
    })
}

// 更新用户基本信息
exports.updateUserInfo = (req, res) => {
    const sql = `update user set? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('修改用户基本信息失败')
        return res.cc('修改用户基本信息成功!', 0)
    })
}

// 更新用户密码
exports.updatePassword = (req, res) => {
    // 1. 查询用户是否存在
    const sql = `select * from user where id=?`
    db.query(sql, req.user.id, (err, results) => {
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('用户不存在!')
    })

    // 2. 判断提交的旧密码是否正确
    const flag = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if(!flag) return res.cc('原密码错误!')

    // 3. 对新密码加密后更新到数据库
    const updateSql = `update user set password=? where id=?`
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    db.query(updateSql, [newPwd, req.user.id], (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('更新密码失败!')
        res.cc('更新密码成功!', 0)
    })
}

// 更新用户头像
exports.updateAvatar = (req, res) => {
    const sql = `update user set user_picture=? where id=?`
    console.log(req.user);
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新头像失败!')  
        return res.cc('更新头像成功!', 0)
    })
}