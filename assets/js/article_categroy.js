/*
 * @Author: your name
 * @Date: 2020-11-10 20:11:19
 * @LastEditTime: 2020-11-11 23:52:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigNews\assets\js\article_categroy.js
 */
$(function() {
    function getCateList() {
        layui.use('table', function() {
            var table = layui.table;

            //第一个实例
            table.render({
                elem: '#myTable',
                height: 500,
                url: '/my/article/cates',
                parseData: function(res) {
                    return {
                        "code": res.status,
                        "msg": res.message,
                        "data": res.data
                    }
                },

                cols: [
                    [ //表头
                        { field: 'name', title: '分类名称' },
                        { field: 'alias', title: '分类别名' },
                        { field: 'is_delete', title: '操作', templet: '#titleTpl' },

                    ]
                ]
            })
        })
    }
    getCateList()
    let addIndex = null
    let editIndex = null
        //弹出添加分类框
    $('.addCategroy').on('click', function() {
            addIndex = layer.open({
                type: 1,
                title: '添加文章分类',
                content: $('#addCategroy').html(),
                area: ['500px', '250px']
            })
            console.log($('.myform input[name=catename]'));

        })
        //添加分类
    $('body').on('submit', '.myform', function(e) {
            e.preventDefault()
            $.ajax({
                type: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res);

                    layer.msg(res.message)
                    layer.close(addIndex)
                    getCateList()
                }
            })
        })
        //弹出修改分类框
    $('body').on('click', '.editBtn', function() {
            editIndex = layer.open({
                type: 1,
                title: '修改文章分类',
                content: $('#editCategroy').html(),
                area: ['500px', '250px']
            })
            $.get('')
        })
        //获取分类
        //修改分类
    $('body').on('click', 'myEditForm', function(e) {
        e.preventDefault()
        $.post('/my/article/updatecate', $(this).serialize(), function(res) {
            layer.msg(res.message)
            console.log(res);

            if (res.status == 0) {
                form.val('editCategroy', res.data)
            }
        })
    })
})