/*
 * @Author: your name
 * @Date: 2020-11-09 18:02:10
 * @LastEditTime: 2020-11-09 18:18:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigNews\assets\js\utils.js
 */
//公共的ajax拦截器

$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})