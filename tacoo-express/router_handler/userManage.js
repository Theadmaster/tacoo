const db = require('../db/index')
const async = require('async')
const { result } = require('@hapi/joi/lib/base')
const qs = require('qs')
const myCon = require('../config')
const mysql = require('mysql')

const { removeDuplicate } = require('../utils/dataHandle') 

// 获取权限列表
exports.getRoleOptions = (req, res) => {
    const sql = `select * from role `
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取角色列表成功',
            data: results
        })
    })
}


// 获取用户列表
exports.getUserList = (req, res) => {
    let query = qs.parse(req.query)
    
    // debug
    // console.log(query);
    let currentPage = (query.currentPage - 1) * query.pageSize
    const sqlSearch = `select u.*,ur.id as 'urid',ur.user_id,ur.role_id 
                        from user u left join user_role ur 
                        on u.id = ur.user_id 
                        where username like '%${query.searchInfo}%'
                        order by u.id asc 
                        limit ${currentPage}, ${query.pageSize}`
    const sqlSearch1 = `select count(*) as id_count 
                        from user 
                        where username like '%${query.searchInfo}%'`
    const sql = `select u.*,ur.id as 'urid',ur.user_id,ur.role_id 
                from user u left join user_role ur 
                on u.id = ur.user_id 
                order by u.id asc 
                limit ${currentPage}, ${query.pageSize}`
    const sql1 = `select count(*) as id_count from user`
    let total = 0;
    const p1 = new Promise((resolve, reject) => {
        if (query.searchInfo != '') {
            db.query(sqlSearch1, (err, results) => {
                if(err) return reject(err)
                total = results[0].id_count
                resolve(total)
            }) 
        } else {
            db.query(sql1, (err, results) => {
                if(err) return reject(err)
                total = results[0].id_count
                resolve(total)
            })
        }
    })
    const p2 = new Promise((resolve, reject) => {
        if (query.searchInfo != '') {
            db.query(sqlSearch, (err, results) => {
                if (err) return reject(err)
                console.log(results);
                resolve(removeDuplicate(results))
            })
        } else {
            db.query(sql, (err, results) => {
                if (err) return reject(err)
                resolve(removeDuplicate(results))
            })
        }
    })


    Promise.all([p1, p2]).then(results => {
        let obj = {}
        obj.total = results[0]
        obj.list = results[1]
        obj.currentPage = query.currentPage
        res.send({
            status: 0,
            message: '获取用户列表成功',
            data: obj
        })
    }).catch( e => {
        res.cc(e)
    })
    
    
}

//增加用户
exports.addUser = (req, res) => {
    const body = qs.parse(req.body)

    const sql = `select * from user where username=? `
    db.query(sql, [req.body.username], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 1 && results[0].name === req.body.name)
            return res.cc('用户名被占用,请更换后重试!')
    })

    const addSql = `insert into user(username, password, realName, email, phone) values(?,?,?,?,?)`
    
    const addSqlParams = [body.username, body.password, body.realName, body.email, body.phone]
    // 插入用户表
    const promise = new Promise((resolve, reject) => {
        db.query(addSql, addSqlParams, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1)
                return reject('插入用户表失败')
            resolve('插入用户表成功')
        })
    })
    // 查询新纪录id
    let promise1 = promise.then(res1 => {
        return new Promise((resolve, reject) => {
            const sql1 = `select id from user where username=?`
            db.query(sql1, body.username, (err, results) => {
                if (err) return res.cc(err)
                if (results.length !== 1) return reject('user_id查询失败')
                resolve(results[0].id)
            })
        })
    }).catch(err => {
        res.cc(err)
    })
    // 插入user_role表
    promise1.then((res1) => {
        const sql = `insert into user_role set ?`
        for (let key = 0; key < body.roleId.length; key++) {
            db.query(sql, { user_id: res1, role_id: body.roleId[key] }, (err, results) => {
                if (err) return res.cc(err)
                if (results.affectedRows !== 1)
                    return res.cc('插入失败')
            })
        }
        res.cc('添加成功', 0)
    }).catch(err => {
        res.cc(err)
    })

}

// 按id删除文章分类
exports.deleteUserById = (req, res) => {
    const sql = `delete from user_role where user_id=?`
    const promise = new Promise((resolve, reject) => {
        db.query(sql, req.params.id, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return reject('删除user_role失败')
            resolve('删除user_role成功')
        })
    })
    promise.then(res1 => {
        const sql = `delete from user where id=?`
        db.query(sql, req.params.id, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('删除失败')
            res.cc('删除成功', 0)
        })
    })
}

// 按id查询文章分类数据
exports.getUserByUsername = (req, res) => {
    const sql = `select * from article_cate where username like '%?%'`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章分类数据失败!')
        res.send({
            status: 0,
            message: '获取文章分类数据成功!',
            data: results[0]
        })
    })
}

// 根据id更新文章分类数据
exports.updateUserById = (req, res) => {
    // const sql = `update article_cate set ? where id=?`

    let connection = mysql.createConnection({
        host: myCon.mysql.host, // 连接的服务器
        user: myCon.mysql.user, // 用户名
        password: myCon.mysql.password, // 用户密码
        database: myCon.mysql.database, // 选择的库
        multipleStatements: true
    })
    
    // 创建一个mysql 线程
    connection.connect()

    const body = qs.parse(req.body)
    const sql = `update user set username='${body.username}', password='${body.password}', realName='${body.realName}', email='${body.email}', phone='${body.phone}' where id=?`
    
    connection.query(sql, body.id, (err, results) => {
        if (err) throw err
        if (results.affectedRows !== 1) throw '更新失败'
        console.log('更新用户信息成功');
    })
    
    if (body.ischanged) {
        // 删除原有的记录
        const deleteSql = `delete from user_role where user_id=?`
        
        connection.query(deleteSql, parseInt(body.id), (err, results) => {
            if(err) throw err
            // if(results.affectedRows === 0) throw '删除失败';
            console.log('删除user_role记录成功');
        })
        
        let values = []
        for(let i=0;i<body.role_id.length;i++) {
            values.push([body.id, parseInt(body.role_id[i])])
        }

        // debug
        // console.log('values', values);

        // 批量新增更新过的记录
        const addSql = `insert into user_role(user_id,role_id) values(?,?)`
        values.forEach((item, index)=>{
            connection.query(addSql, item, (err, results, fields) => {
                if (err) { 
                    console.log('UPDATE ERROR - ', err.message);
                    throw err
                }
            })
        })
    } 
    connection.end(function(err){
        if (err){
            res.cc(err)
        } else {
            res.cc('修改成功', 0)
        }
    });
    
}