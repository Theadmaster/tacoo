const express = require('express')

const app = express()

const cors = require('cors')
app.use(cors())

// 只能解析 x-www-form-urlencoded
app.use(express.urlencoded({extended: false}))

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))

app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error? err.message: err
        })
    }
    next()
})

// 配置解析Token的中间件
const config = require('./config')
const expressJWT = require('express-jwt')
app.use(expressJWT({ 
    secret:config.jwtSecretKey,
    algorithms: ['HS256'] }).unless({path: [/^\/api\//]}))

// 导入使用用户模块
const userRouter = require('./router/user')
const Joi = require('joi')
app.use('/api', userRouter)

// 导入使用用户信息模块
const userInfoRouter = require('./router/userInfo')
app.use('/my', userInfoRouter)

// 导入用户管理模块
const userManageRouter = require('./router/userManage')
app.use('/user', userManageRouter)

// 导入角色管理模块
const roleRouter = require('./router/role')
app.use('/role', roleRouter)

// 导入使用文章分类路由模块
const articleCateRouter = require('./router/articleCate')
app.use('/my/article', articleCateRouter)

const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)


// 全局 错误处理中间件
app.use((err, req, res, next) => {
    //token 解析失败导致的错误
    if(err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败!')
    }

    // 数据验证错误
    if(err instanceof Joi.ValidationError) {
        return res.cc(err)
    }

    // 其他原因导致的错误
    res.cc(err, 500)
})

app.listen(8088, () => {
    console.log('http://127.0.0.1:8088');
})