const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config =require('../config')


// 注册的处理函数
exports.register = (req, res) => {
    const userInfo = req.body
    console.log(userInfo);

    // 该验证模块已被Joi替代
    // if (!userInfo.username || !userInfo.password) {
    //     return res.send({ status: 1, message: '用户名或密码不能为空!' })
    // }

    // 检测用户名是否被占用
    const regTestSql = `select * from user where username=?`
    db.query(regTestSql, [userInfo.username], (err, result) => {
        if (err) 
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        if (res.length > 0) 
            // return res.send({ status: 1, message: '用户名被占用,请更换其他用户名' })
            return res.cc('用户名被占用,请更换其他用户名')
    })

    // 密码加密
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)

    // 注册
    const regSql = `insert into user set ? `
    db.query(regSql, {username: userInfo.username, password: userInfo.password}, (err, result) => {
        if (err) 
            return res.cc(err)
        if (result.affectedRows !== 1) {
            // res.send({status: 1, message: '注册用户失败,请稍后再试!'})
            res.cc('注册用户失败,请稍后再试!')
        }
        // res.send({status: 0, message: 'register succeed'})
        res.cc('register succeed', 0)
    })
    
}

// 登录的处理函数
exports.login = (req, res) => {
    // 接收表单数据
    const userInfo = req.body
    // 定义sql语句
    // const sql = `select * from user where username=?`
    const sql = `select u.*,ur.id as 'ur_id',ur.role_id,
                    m.id as menu_id,m.name as menu_name,m.url,
                    m.enable,m.parent_id,m.icon
                    from user u inner join user_role ur 
                    on u.id = ur.user_id and u.username=? 
                    inner join menu_role mr on mr.role_id=ur.role_id
                    inner join menu m on m.id=mr.menu_id `
    // 执行sql 
    db.query(sql, userInfo.username, (err, results) => {
        if(err) return res.cc(err)
        // if(results.length !== 1) return res.cc('登录失败!') 
        
        // 密码解密
        // const flag = bcrypt.compareSync(userInfo.password, results[0].password)
        // if(!flag) return res.cc('登录失败!')
        if(results[0].password !== userInfo.password) return res.cc('登录失败！')
        let user = results[0]
        user.roleId = []
        user.menu = []
        for(let item of results) {
            if(!user.roleId.find( id => id == item.role_id)) {
                user.roleId.push(item.role_id)
            }
            user.menu.push({
                menuId: item.menu_id,
                menuName: item.menu_name,
                menuUrl: item.url,
                menuEnable: item.enable,
                menuIcon: item.icon
            })
        }
        // console.log( user);
        let obj = {...results[0], nickName: '', user_picture: ''}
        const tokenStr = jwt.sign(obj, config.jwtSecretKey, {
            expiresIn: '10h' //token 有效期 10hours
        })
        res.send({
            status: 0,
            message: '登录成功!',
            token: 'Bearer ' + tokenStr,
            data: user
        })
    })
    
}