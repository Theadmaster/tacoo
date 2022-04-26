const express = require('express')

const router = express.Router()

const userManage_handler = require('../router_handler/userManage')

const expressJoi = require('@escook/express-joi')

const { add_user_schema, 
    delete_user_schema, 
    get_user_schema,
    update_user_schema } = require('../schema/userManage')

router.get('/getRoleOptions', userManage_handler.getRoleOptions)

router.get('/getUserlist', userManage_handler.getUserList)

router.post('/addUser', userManage_handler.addUser)
// router.post('/addUser', userManage_handler.addUser)

router.post('/deleteUser/:id', expressJoi(delete_user_schema), userManage_handler.deleteUserById)

// router.get('/cates/:id', expressJoi(get_user_schema), userManage_handler.getUserById)

// router.post('/updateUser', expressJoi(update_user_schema), userManage_handler.updateUserById)
router.post('/updateUser', userManage_handler.updateUserById)

module.exports = router