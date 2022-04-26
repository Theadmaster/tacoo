const express = require('express')

const router = express.Router()

const userinfo_handler = require('../router_handler/userInfo')

const expressJoi = require('@escook/express-joi')

// 导入需要的验证规则对象
const { 
    update_userinfo_schema, 
    update_password_schema,
    update_avatar_schema
} = require('../schema/user')

router.get('/userinfo', userinfo_handler.getUserInfo)

// router.get('/userinfo', (req, res) => {
//     res.cc('succeed', 0)
// })

// 更新用户基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

// 更改密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)

// 更新用户头像
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

module.exports = router