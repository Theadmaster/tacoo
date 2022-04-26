const db = require("../db")
const path = require('path')

exports.addArticle = (req, res) => {
    // 判断是否提交封面图片
    if(!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数!')
    
    // 整理插入数据库的文章信息对象
    const articleInfo = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id // jwt -> user
    }

    const sql = `insert into article set ? `
    db.query(sql, articleInfo, (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('发布文章失败!')
        res.cc('发布文章成功!', 0)
    })
}