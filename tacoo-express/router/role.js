const express = require('express')

const router = express.Router()

const role_handler = require('../router_handler/role')

const expressJoi = require('@escook/express-joi')

router.get('/getRoles', role_handler.getRoles)

router.post('/addRole', role_handler.addRole)

router.post('/updateRole', role_handler.updateRoleById)

router.post('/deleteRole/:id', role_handler.deleteRoleById)

module.exports = router