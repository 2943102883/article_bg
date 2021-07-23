$(function () {
    //获取用户基本信息
    getUserInfo();
    //退出登录
    logOut();
})
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                // 强制清空token
                localStorage.removeItem('token');
                // 强制跳转到登录界面
                location.href = '/login.html'
                // console.log('测试');
                return layui.layer.mag('获取用户信息失败', { icon: 2 })
            }
            // 渲染用户头像
            console.log(res);
            renderAvatar(res.data);
        },
        complete: function (res) {
            console.log('test');
            console.log(res);
            if (res.responseJSON == 1 && res.message == '身份认证失败！') {
                // 强制清空token
                localStorage.removeItem('token');
                // 强制跳转到登录界面
                location.href = '/login.html'
            }
        }
    });
}
//设置头像
function renderAvatar(user) {
    // 获取昵称，或者名字
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;' + name);
    // 按需渲染头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        // 获取名字的第一个字符
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
//退出登录
function logOut() {
    $('#btnLogout').on('click', function () {
        //提示用户是否退出
        layui.layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //清空本地存储中的token
            localStorage.removeItem('token');
            //重新跳转到登录页
            location.href = '/login.html'
            //关闭提示框
            layer.close(index);
        });
    })
}