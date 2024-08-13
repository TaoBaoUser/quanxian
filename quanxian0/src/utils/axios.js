// src/axios.js
import axios from "axios";

// 基础配置
const http = axios.create({
  baseURL: "http://127.0.0.1:3000",
});

// 添加响应拦截器
http.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "";
    if (error.response) {
      errorMessage =
        error.response.data.message ||
        `错误 ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      errorMessage = "未收到服务器响应";
    } else {
      errorMessage = `请求错误: ${error.message}`;
    }
    window.alert(errorMessage);

    // 返回一个默认的成功响应对象，防止 Vue 捕获到 Promise 拒绝
    return Promise.resolve({
      data: {
        status: 500,
        message: errorMessage,
        data: [],
      },
    });
  }
);

export default http;

// 请求方法封装
export const request = (config) => {
  return http.request(config);
};

export const getRequest = (url, params) => {
  return request({
    url,
    method: "get",
    params,
  });
};

export const postRequest = (url, data, params) => {
  return request({
    url,
    data,
    params,
    method: "post",
  });
};
