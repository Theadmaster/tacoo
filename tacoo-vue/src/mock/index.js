import Mock from 'mockjs'

import Login from './login.js'
import InfoList from './infolist'
import ControlList from './controllist'
import StaffManage from './staffmanage'
import CarManage from './carmanage'

// 设置mock的延时
Mock.setup({
  timeout: '200-2000'
})

const baseUrl = 'http://127.0.0.1'
// 登录数据的拦截
Mock.mock(baseUrl + '/public/login', 'post', Login.getToken)
Mock.mock('http://localhost/user/info', 'post', Login.getUserInfo)
Mock.mock(baseUrl + '/menu/tree', 'get', Login.getMenuInfo)

Mock.mock(baseUrl + '/getInfoList', 'post', InfoList.getInfoList)
Mock.mock(baseUrl + '/getControlList', 'post', ControlList.getControlList)
Mock.mock(baseUrl + '/getStaffList', 'post', StaffManage.getStaffList)
Mock.mock(baseUrl + '/getCarList', 'post', CarManage.getCarList)
