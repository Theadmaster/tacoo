const db = require('../db/index')
const async = require('async')
const { result } = require('@hapi/joi/lib/base')
const qs = require('qs')
const myCon = require('../config')
const mysql = require('mysql')


// 获取权限列表
exports.getRoles = (req, res) => {
    let query = qs.parse(req.query)
    
    // debug
    // console.log(query);

    let currentPage = (query.currentPage - 1) * query.pageSize

    const sqlSearch = `select *
                        from role
                        where name like '%${query.searchInfo}%'
                        order by id asc 
                        limit ${currentPage}, ${query.pageSize}`
    const sqlSearch1 = `select count(*) as id_count 
                        from role 
                        where name like '%${query.searchInfo}%'`
    const sql = `select *
                from role 
                order by id asc
                limit ${currentPage}, ${query.pageSize}`
    const sql1 = `select count(*) as id_count from role`
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
                resolve(results)
            })
        } else {
            db.query(sql, (err, results) => {
                if (err) return reject(err)
                resolve(results)
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

exports.addRole = (req, res) => {
    const name = req.body.roleName
    const sql = `insert into role(name) values(?)`
    db.query(sql, name, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1)
            return res.cc('插入角色失败')
        res.cc('插入角色表成功', 0)
    })
}

exports.updateRoleById = (req, res) => {
    const body = req.body
    const sql = `update role set name=? where id=? `
    db.query(sql, [body.roleName, body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新角色失败!')  
        return res.cc('更新角色成功!', 0)
    })
}

exports.deleteRoleById = (req, res) => {
    const sql = `delete from role where id=?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除角色失败')
        res.cc('删除角色成功', 0)
    })
}