/*
 * @Author: your name
 * @Date: 2020-11-10 20:11:19
 * @LastEditTime: 2020-11-10 22:40:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigNews\assets\js\article_categroy.js
 */
$(function() {
    layui.use('table', function() {
        var table = layui.table;

        //第一个实例
        table.render({
            elem: '#demo',
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
    $('.addCategroy').on('click', function() {
        alert('haha')
    })

})