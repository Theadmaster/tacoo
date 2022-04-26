const express = require('express')

const router = express.Router()

const business_handler = require('../router_handler/business')

const expressJoi = require('@escook/express-joi')

router.get('/getBusiness', business_handler.getBusiness)

router.post('/addBusiness', business_handler.addBusiness)

router.post('/updateBusiness', business_handler.updateBusinessById)

router.post('/deleteBusiness/:id', business_handler.deleteBusinessById)

module.exports = router