$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })
    //初始化用户基本信息
    initUserInfo();
    // 重置表单数据
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        initUserInfo();
    })
    // 监听表单的提交
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发起ajax数据请求
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新信息失败', {icon: 2})
                }
                // 调用父页面的方法，重新渲染头像
                window.parent.getUserInfo();
                layui.layer.msg('更新信息成功', {icon: 1})
            }
        });
    })

})
//初始化用户基本信息
function initUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败', {icon: 2})
            }
            // 调用form.val()快速为表单赋值
            layui.form.val('formUserInfo',res.data)
            // layui.layer.msg('获取用户信息成功', {icon: 1})
        }
    });
}