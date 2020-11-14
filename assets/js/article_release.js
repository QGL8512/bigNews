// const layuiAll = require("../lib/layui/layui.all");

/*
 * @Author: your name
 * @Date: 2020-11-13 22:18:18
 * @LastEditTime: 2020-11-14 17:08:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigNews\assets\js\article_release.js
 */
$(function() {
    //调用函数初始化富文本编辑器
    initEditor()
        // 初始化图片裁剪
    let $img = $('#image')
    const options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    $img.cropper(options)
    $.get('/my/article/cates', function(response) {
            console.log(response);
            let data = response
            var getTpl = myTemp.innerHTML,
                view = document.getElementById('options');
            layui.laytpl(getTpl).render(data, function(html) {
                view.innerHTML = html;
            });

            layui.form.render()
        })
        // 拿到裁剪图片
    $('.btn-upload').on('click', function() {
        $('#avatar').click()
    })
    $('#avatar').change(function() {
            // console.log('我选中了图片')
            let imgUrl = URL.createObjectURL(this.files[0])
            console.log(imgUrl);
            // $('#image').cropper('destroy').attr('src', imgUrl).cropper(options)
            $('#image').cropper('replace', imgUrl)
        })
        //监听form的点击事件
    $('.myform').on('click', '.btn', function(e) {
        e.preventDefault()
        console.log($(this).text());

        // 拿到formData数据
        let fd = new FormData($('.myform')[0])
        if ($(this).hasClass('btn-release')) {
            fd.append('state', '已发布')
            console.log('我是已发布')
        } else {
            fd.append('state', '草稿')
            console.log('我是草稿')
        }

        $('#image').cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob(function(blob) {
            // blob就是图片的二进制形式
            fd.append('cover_img', blob)
            fd.append('content', tinyMCE.activeEditor.getContent())
            $.ajax({
                type: 'POST',
                url: '/my/article/add',
                contentType: false,
                processData: false,
                data: fd,
                success: function(res) {
                    if (res.status == 0) {
                        location.href = './article_list.html'
                    }
                }
            })

        })
    })

})