$(function () {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()


    //获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        });
    }
    var indexAdd = null
    // 为添加类别按钮绑定点击事件
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    //通过代理的方式，为form-add绑定submit
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败', { icon: 2 })
                }
                initArtCateList()
                layer.msg('新增分类成功', { icon: 1 })
                //根据索引关闭弹出层
                layer.close(indexAdd)
            }
        });
    })
    // 通过代理的方式，为编辑按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个修改文章信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        let id = $(this).attr('data-id')
        // 发送ajax获取对应分类的数据
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        });
    })
    // 通过代理的方式，为修改表单绑定submit事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类失败', { icon: 2 })
                }
                initArtCateList()
                layer.msg('更新分类成功', { icon: 1 })
                //根据索引关闭弹出层
                layer.close(indexEdit)
            }
        });
    })
    // 通过代理的方式，为删除绑定事件
    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id')
        //提示用户是否删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败', { icon: 2 })
                    }
                    layer.msg('删除分类成功', { icon: 1 })
                    layer.close(index);
                    initArtCateList()
                }
            });
        });
    })

})