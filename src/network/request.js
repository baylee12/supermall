import axios from "axios";

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    //   "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    // },
    baseURL: 'http://152.136.185.210:7878/api/m5',
    // baseURL: 'http://localhost:9000/api/m5',
    // baseURL: '/backend',
    timeout: 20000
  });
  //2.拦截器
  //2.1 请求拦截
  instance.interceptors.request.use(config => {
    return config;
  }, err => {

  });
  //2.2 响应拦截
  instance.interceptors.response.use(res => {
    return res.data;
  }, err => {

  });
  //3.发送网络请求
  return instance(config);
}

