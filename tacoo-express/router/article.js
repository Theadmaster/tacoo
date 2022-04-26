// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

const multer = require('multer')
const path = require('path')
const upload = multer({ dest:path.join(__dirname, '../uploads' )})

const { add_article_schema } = require('../schema/article')

const article_handler = require('../router_handler/article')
const expressJoi = require('@escook/express-joi')

// 发布新文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)

// 向外共享路由对象
module.exports = router