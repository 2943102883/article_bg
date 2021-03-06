$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    // 定义一个查询的参数对象，请求数据的时候，将参数传到服务器
    var q = {
        pagenum: 1,  // 页码值，默认请求第一页的数据
        pagesize: 2,  // 每页显示几条数据，默认为2
        cate_id: '',  // 文章分类的 Id
        state: ''  // 文章的状态，可选值有：已发布、草稿
    }
    initTable()
    initCate()

    // 为筛选表单绑定submit事件
    $('#form-search').on('submit', function (e) {
        e.perventDefault()
        // 获取表单中选中项的值
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        // 为查询参数对象q对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        // 根据新的筛选条件，重新渲染表格的数据
        initTable()
    })

    // 通过代理的方式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function (e) {
        //获取删除按钮的个数，有几个，就证明这一页还剩多少个数据
        let len = $('.btn-delete').length
        id = $(this).attr('data-id')
        // 询问用户是否删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: "GET",
                url: "/my/article/delete/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败', { icon: 2 })
                    }
                    layer.msg('删除文章成功', { icon: 1 })
                    if (len == 1) {
                        // 页码值最小为1
                        q.pagenum == 1 ? 1 : q.pagenum -1
                    }
                    initTable()
                    layer.close(index);
                }
            });
        });
    })

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (data) {
        const dt = new Date(data)
        let y = dt.getFullYear()
        let m = padZero(dt.getMonth())
        let d = padZero(dt.getDate())
        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + '-' + ' ' + hh + ':' + mm + ':' + ss
    }
    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 获取文章数据
    function initTable() {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章数据失败', { icon: 2 })
                }
                // 使用模板引擎渲染页面的数据
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                //调用渲染分页的方法
                renderPage(res.total)
            }
        });
    }
    // 初始化文章分类
    function initCate() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败', { icon: 2 })
                }
                console.log(res);
                // 调用模板引擎，渲染分类可选项
                let htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        });
    }
    // 定义渲染分页的方法
    function renderPage(total) {
        // console.log(total);
        // 调用laypage.render()渲染页面结构
        laypage.render({
            elem: 'pageBox',  // 分页容器的ID
            count: total,  // 总数据条数
            limit: q.pagesize,  // 每页显示多少条
            curr: q.pagenum,  // 指定默认选中哪页
            //分页有哪些元素
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页切换到时候出发jump回调函数
            // 出发jump回调的方式有两种：
            // 1、点击页码
            // 2、只要调用了laypage.render()就会触发
            jump: function (obj, first) {
                // 把最新的页码值赋值给q这个查询参数对象中
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    // 根据最新的q获取对应的数据列表，并渲染表格
                    initTable()
                }

            }
        })
    }

})