/*
 * @Author: your name
 * @Date: 2020-11-09 16:15:06
 * @LastEditTime: 2020-11-10 15:07:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigNews\assets\js\login.js
 */
$(function() {
    $('.login a').on('click', function(e) {
        console.log('aaa');

        $('.login').hide().next().show()
    })
    $('.register a').on('click', function(e) {
        $('.register').hide().prev().show()
    })

    var form = layui.form
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符'
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\''
            }

        },
        repass: function(value, item) {

            var passVal = $('.register .pass').val()

            if (passVal !== value) {
                $('.register .pass,.register .repass').val('')
                return '两次输入的密码不一致'
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pass: [
            /^[\d]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    });

    $('.register .myform').on('submit', function(e) {
        // 3.2 阻止form标签的默认提交 行为
        e.preventDefault()

        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            // data: data,
            data: $(this).serialize(),
            success: function(res) {
                // 3.4 提示是否成功  失败成功都提示
                layer.msg(res.message)
                    // 3.5 如果成功则要切换到登陆界面
                if (res.status == 0) {
                    $('.register a').click()
                }
            }
        })
    })
    $('.login .myform').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                // 4.4 提示是否成功  失败成功都提示
                layer.msg(res.message)
                    // 4.5 如果成功则要跳转到index.html页面
                if (res.status == 0) {
                    localStorage.setItem('token', res.token)
                    location.href = './index.html'
                }
            }
        })

    })
})