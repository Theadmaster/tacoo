import { request } from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function logout() {
  return request({
    url: '/public/logout',
    method: 'post'
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'post'
  })
}
