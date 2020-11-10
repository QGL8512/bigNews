/*
 * @Author: your name
 * @Date: 2020-11-10 17:33:31
 * @LastEditTime: 2020-11-10 18:12:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigNews\assets\js\user_pass.js
 */
$(function() {
    var form = layui.form
    form.verify({
        repass: function(value, item) {

            var passVal = $(' .pass').val()

            if (passVal !== value) {
                $('.pass,.repass').val('')
                return '两次输入的密码不一致'
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pass: [
            /^[\d]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    })
    $('.myform').on('submit', function(e) {
        e.preventDefault()
        console.log('我被提交了');
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status == 0) {
                    layer.msg(res.message + '即将退出重新登陆')
                    setTimeout(() => {
                        window.location.href = '../login.html'
                    }, 2000);
                } else {
                    layer.msg(res.message)
                }
            }
        })

    })
})