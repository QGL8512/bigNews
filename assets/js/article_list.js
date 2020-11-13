// const { template } = require("../lib/template-web");

/*
 * @Author: your name
 * @Date: 2020-11-12 17:57:55
 * @LastEditTime: 2020-11-13 19:03:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigNews\assets\js\article_list.js
 */
$(function() {
    getCategory()
        // 下拉框分类渲染
    function getCategory() {
        $.get('/my/article/cates', function(res) {
            console.log(res);
            // template-web方法
            // let optionStr = template('options', res)
            // $('#category').html(optionStr)
            //layui.form.render()
            //---------------------------------------------------
            // layui的模板渲染
            let data = res
            let getTpl = options.innerHTML,
                view = document.getElementById('category')
            layui.laytpl(getTpl).render(data, function(html) {
                view.innerHTML = html;
            });
            layui.form.render()
        })
    }
    getArticleList()
        // 文章列表渲染
    function getArticleList() {
        layui.use('table', function() {
            //table实例
            layui.table.render({
                elem: '#myTable',
                height: 312,
                url: '/my/article/list',
                parseData: function(res) { //格式化返回数据
                    return {
                        "code": res.status,
                        "msg": res.message,
                        "count": res.total,
                        "data": res.data
                    }
                },
                page: true, //开启分页
                limit: 4,
                limits: [4, 8, 12],
                request: {
                    pageName: 'pagenum',
                    limitName: 'pagesize'
                },
                cols: [
                    [ //表头
                        { field: 'Id', title: 'ID', hide: 'false' },
                        { field: 'title', title: '文章标题' },
                        { field: 'cate_name', title: '分类', width: 200, align: 'center' },
                        { field: 'pub_date', title: '发表时间', width: 200, align: 'center' },
                        { field: 'state', title: '状态', width: 200, align: 'center' },
                        { title: '操作', toolbar: '#myBtns', width: 200, align: 'center' },

                    ]
                ]
            });

        });
    }
    // 监听tooltar工具
    layui.table.on('tool(myTable)', function(res) {
            let data = res.data
            let layEvent = res.event
            console.log(data)
            if (layEvent === 'edit') {
                layer.msg('还在写')
            } else if (layEvent === 'del') {
                layer.confirm('是否删除该文章？', {
                    icon: 3,
                    title: '提示',
                }, function(i) {
                    $.get(`/my/article/delete/${data.Id}`, function(info) {
                        layer.msg(info.message)
                        layer.close(i)
                        getArticleList()

                    })
                })
            }
        })
        //点击筛选分类重新渲染
    layui.form.on('select', function(data) {
        // console.log(data.elem); //得到select原始DOM对象
        // console.log(data.value); //得到被选中的值
        // console.log(data.othis); //得到美化后的DOM对象
        $('.myform').on('submit', function(e) {
            e.preventDefault()
            console.log(data.value);
            console.log(data.elem)
            console.log(data.othis)

        })
    });

})