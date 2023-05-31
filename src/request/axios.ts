interface tsOptions {
    url:string,
    method:string,
    data?:any,
    httpType?:string
}
import { ElMessage } from 'element-plus'
import axios from 'axios'
import {routerConfig} from '../router/router'

const currentEnv='pro' // pro正式
// const currentEnv=' test' //test 测试 


const envDist={
  test:'http://192.168.0.28:8012/',
  pro:'http://edu-admin.iboaite.com/'
}

let  baseURL=envDist[currentEnv]


// 前置处理 为了调个人接口方便
function testHttp(){
  let dist:any={
    'ts':'http://monitor-admin.boaiteyanke.com:8900/',
    'jx':'http://192.168.0.50:8000/',
    'lg':'http://192.168.0.104:8000/',
    'bg':'http://edu-admin.boaiteyanke.com:8900/',
    'xy':'http://192.168.0.40:8000/'
  }
  let key=localStorage.getItem('java')  
  if(key){
    baseURL=key.includes('http://')?key:dist[key]
    return '个人服务'
  } 
}
testHttp()

class HTTP{
  static config(options:tsOptions):any{
    let url=options.url
    let method=options.method||'get'
    let query=HTTP.setQuery(options)
    let headers=HTTP.setRequestHeader()
    let responseType=options.httpType?{responseType: 'blob'}:{}
    let con={
      url,
      method,
      ...responseType,
      baseURL,
      headers,
      ...query,
      timeout: 30000
    }
    return con
  }
  
  // 单位时间内只能触发一次错误请求弹框 后续异常弹框直接拦截
  static timdeCode=0
  static onceErrTip(ss=500){
    if(new Date().getTime()-HTTP.timdeCode<ss){
      return Promise.reject('禁止触发多层请求异常弹窗,目前单位系数为500毫秒')
    }
    HTTP.timdeCode=new Date().getTime()
    return Promise.resolve()
  }
   
  // 处理参数
  static setQuery(options:tsOptions){
    let data=options.method!=='get'?options.data:{}
    let params=options.method==='get'?options.data:{}
    return {data, params}
  }
  // 请求头
  static setRequestHeader(){
    const token=localStorage.getItem('token')
    let Authorization=token||''
    let header={
      'platform': 'BAT-edu-WEB',
      ...(Authorization?{Authorization:Authorization}:{})
    }
    return header
  }
  // 处理异常
  static async setError(data:any){
    await HTTP.onceErrTip()
    if(data.code===403){
      routerConfig.replace({name: '403', query:{}})
      return '无权限'
    }
    ElMessage({
        message: data.message,
        type: 'warning',
      })
    return '异常情况'
  }

  // 处理数据
  static dealRes(data:any){
    return data.result||data
  }

  // 未授权以及授权失效的登录跳转
  static toLogin(){
    localStorage.setItem('token', '')
    routerConfig.replace({name: 'login', query:{}})
  }

  // 
  static async http(options:any){
    return new Promise((resolve, reject)=>{
      axios.request(HTTP.config(options)).then((res:any)=>{  
        if(options.httpType==='file'){ //文件流下载
          resolve(res)
          return 0
        }
        if(res.data.success){
          resolve(HTTP.dealRes(res.data))
        }
        if(!res.data.success){
          reject(HTTP.setError(res.data))
        }
      }).catch(async(err:any)=>{
        let noLogin=err.toString().includes('401')
        let msg=noLogin?'请重新授权':'服务器异常'
        if(noLogin&&!testHttp()){
          HTTP.toLogin()
        }
        await HTTP.onceErrTip()
        ElMessage({
            message: msg,
            type: 'error',
          })
        reject(msg)
      })
    })  
  }

  // 导出的快捷api
  static async get(url:string, data?:Object){
    let options={url, method:'get', data}
    return HTTP.http(options)
  }
  static async post(url:string, data?:Object){
    let options={url, method:'post', data}
    return HTTP.http(options)
  }
  static async delete(url:string, data?:Object){
    let options={url, method:'delete', data}
    return HTTP.http(options)
  }
  static async put(url:string, data?:Object){
    let options={url, method:'put', data}
    return HTTP.http(options)
  }
  // 导出URL
  static httpUrl=baseURL

  static env=currentEnv

}

export default HTTP