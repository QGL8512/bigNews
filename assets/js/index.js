/*
 * @Author: your name
 * @Date: 2020-11-09 20:45:00
 * @LastEditTime: 2020-11-11 16:52:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigNews\assets\js\index.js
 */
$(function() {
    getUserInfo()

    function getUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function(res) {

                if (res.status == 0) {
                    $('.myImg .welcome').html(`
                    欢迎&nbsp;&nbsp;${res.data.nickname || res.data.username}
                `)
                    if (!res.data.user_pic) {
                        if (!res.data.nickname) {
                            $('.myavatar').text(res.data.username.slice(0, 1).toUpperCase())
                        } else {
                            $('.myavatar').text(res.data.nickname.substr(1).toUpperCase())
                        }
                    } else {
                        $('.myavatar').hide().next().show().attr('src', res.data.user_pic)
                    }
                }

            }
        })
    }
    window.getUserInfo = getUserInfo
    $('#exit').on('click', function() {
        console.log('我被点击了');
        layer.confirm('真的要退出吗?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = './login.html'
            layer.close(index)
        })
    })
})