/*
 * @Author: your name
 * @Date: 2020-11-11 16:01:27
 * @LastEditTime: 2020-11-11 21:47:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigNews\assets\js\user_info.js
 */
$(function() {
    let form = layui.form
    renderForm()

    function renderForm() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            // data: layui.form.val('myForm'),
            success: function(res) {
                layer.msg(res.message)
                if (res.status == 0) {
                    console.log(res);
                    // $('.myform input[name=username]').val(res.data.username)
                    // $('.myform input[name=nickname]').val(res.data.nickname)
                    // $('.myform input[name=email]').val(res.data.email)
                    // $('.myform input[name=id]').val(res.data.id)
                    // layui.form.val('myform', {
                    //         username: res.data.username,
                    //         nickname: res.data.nickname,
                    //         email: res.data.email
                    //     })
                    // renderData = res.data

                    form.val('myForm', res.data)
                }
            }
        })
    }
    $('.myform').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status == 0) {
                    parent.window.getUserInfo()
                }

            }
        })
    })
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        }
    })

})