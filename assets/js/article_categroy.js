/*
 * @Author: your name
 * @Date: 2020-11-10 20:11:19
 * @LastEditTime: 2020-11-12 17:45:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigNews\assets\js\article_categroy.js
 */
$(function() {
    let addIndex = null
    let editIndex = null
    let renderData

    function getCateList() {
        layui.use('table', function() {

                //第一个实例
                layui.table.render({
                    elem: '#myTable',
                    height: 500,
                    url: '/my/article/cates',
                    request: {
                        pageName: 'curr' //页码的参数名称，默认：page
                            ,
                        limitName: 'nums' //每页数据量的参数名，默认：limit
                    },
                    parseData: function(res) {
                        return {
                            "code": res.status,
                            "msg": res.message,
                            "data": res.data
                        }
                    },

                    cols: [
                        [ //表头
                            { field: 'Id', title: 'ID', hide: 'false' },
                            { field: 'name', title: '分类名称' },
                            { field: 'alias', title: '分类别名' },
                            { field: 'is_delete', title: '操作', toolbar: '#titleTpl' },
                        ]
                    ]
                })
            })
            //监听工具条 
        layui.table.on('tool(myTable)', function(res) {
            let data = res.data
            let layEvent = res.event
                // let tr = res.tr
                // console.log(data);
            if (layEvent === 'edit') {
                console.log('我被编辑了');
                editIndex = layer.open({
                    type: 1,
                    title: '修改文章分类',
                    content: $('#editCategroy').html(),
                    area: ['500px', '250px']
                })
                $.get(`/my/article/cates/${data.Id}`, function(res) {
                        console.log(res);
                        if (res.status == 0) {
                            renderData = res.data
                            layui.form.val('editForm', res.data)
                            console.log($(this));

                        }
                    })
                    // 编辑更新功能
                $('.myEditForm').on('submit', function(e) {
                    e.preventDefault()
                    $.post('/my/article/updatecate', $(this).serialize(), function(res) {
                        console.log(res)
                        layer.msg(res.message)
                        layer.close(editIndex)
                        getCateList()
                    })
                })
                $('.reset').on('click', function(e) {
                        e.preventDefault()
                        layui.form.val('editForm', renderData)
                    })
                    // 删除分类功能
            } else if (layEvent === 'del') {
                console.log('我被删除了');
                layer.confirm('是否删除该分类?', { icon: 3, title: '提示' }, function(index) {
                    $.get(`/my/article/deletecate/${data.Id}`, function(res) {
                        if (res.status == 0) {
                            layer.msg(res.message)
                            getCateList()
                        }
                    })

                    layer.close(index);
                });

            }
        })
    }
    getCateList()

    //弹出添加分类框
    $('.addCategroy').on('click', function() {
            addIndex = layer.open({
                    type: 1,
                    title: '添加文章分类',
                    content: $('#addCategroy').html(),
                    area: ['500px', '250px']
                })
                // console.log($('.myform input[name=catename]'));

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