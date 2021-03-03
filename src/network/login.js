import {request} from "network/request.js"

export function register(data){
  return request({
    url:'/api/register',
    method:'post',
    data:data
  })
}

export function login(data){
  return request({
    url:'/login',
    method:'post',
    data:data
  })
}
