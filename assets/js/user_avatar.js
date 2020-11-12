/*
 * @Author: your name
 * @Date: 2020-11-11 17:52:16
 * @LastEditTime: 2020-11-11 22:23:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigNews\assets\js\user_avatar.js
 */
$(function() {
    let $image = $('#image')
    console.log($image);

    let options = {
        aspectRatio: 1,
        preview: '.img-b'
    }

    $image.cropper(options);
    $('#upload').on('click', function(e) {
        console.log('dian');

        $('#avatar').click()

    })
    $('#avatar').change(function() {
        console.dir(this)
        let file = this.files[0]

        let imgUrl = URL.createObjectURL(file)
        console.log(imgUrl);
        $image.cropper('destroy').attr('src', imgUrl).cropper(options)
    })
    $('#confirm').on('click', function() {
        let src = $image.attr('src')
        if (src.indexOf('./assets/images/sample.jpg') !== -1) {
            return layer.msg('请上传图片之后再生成头像！')
        }
        let dataURL = $image.cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            }).toDataURL('image/png')
            // $.ajax({
            //         type: 'POST',
            //         url: '/my/update/avatar',
            //         data: {
            //             avatar: dataURL
            //         },
            //         success: function(res) {
            //             console.log(res);

        //         }
        //     })
        $.post('/my/update/avatar', {
            avatar: dataURL
        }, function(res) {
            console.log(res)
            parent.window.getUserInfo()
            return layer.msg(res.message)
        })
    })
})