const express = require('express')

const router = express.Router()

const articleCate_handler = require('../router_handler/articleCate')

const expressJoi = require('@escook/express-joi')

const { add_cate_schema, 
        delete_cate_schema, 
        get_cate_schema,
        update_cate_schema } = require('../schema/articleCate')

router.get('/cates', articleCate_handler.getArticleCates)

router.post('/addcates', expressJoi(add_cate_schema), articleCate_handler.addArticleCates)

router.post('/deletecate/:id', expressJoi(delete_cate_schema), articleCate_handler.deleteCateById)

router.get('/cates/:id', expressJoi(get_cate_schema), articleCate_handler.getArticleById)

router.post('/updatecate', expressJoi(update_cate_schema), articleCate_handler.updateArticleById)

module.exports = router