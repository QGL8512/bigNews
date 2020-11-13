/*
 * @Author: your name
 * @Date: 2020-11-09 18:02:10
 * @LastEditTime: 2020-11-13 10:09:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigNews\assets\js\utils.js
 */
//公共的ajax拦截器

$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    if (options.url.includes('/my')) {
        options.headers = {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIyMjEsInVzZXJuYW1lIjoicWdsIiwicGFzc3dvcmQiOiIiLCJuaWNrbmFtZSI6IlFnbCIsImVtYWlsIjoiMTIzMTQyM2VycXdAMTYzLmNvbSIsInVzZXJfcGljIjoiIiwiaWF0IjoxNjA1MjI3NTUzLCJleHAiOjE2MDUyNjM1NTN9.alX2S7GINR9j_0aJ9nWFN9hVYREUzqC95qV2Y6605gM"
                // localStorage.getItem('token')
        }
    }

})