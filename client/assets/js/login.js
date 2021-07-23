$(function () {
    // 测试账号密码：aa,aaaaaa
    //从layUI中获取各种对象
    var form = layui.form;
    var layer = layui.layer;

    // 点击去注册账号
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登录
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })


    form.verify({
        // 自定义pwd校验规则
        'pwd': [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        'repwd': function (val, item) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== val) {
                return '两次密码不一致'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //阻止默认提交行为
        e.preventDefault();
        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post("/api/reguser",data ,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, {icon: 2}); 
                }
                layer.msg(res.message, { icon: 1 });
                //模拟点击行为
                $('#link_login').click();
            }
        );
    })
    //监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        //阻止默认提交行为
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            //jquery中的快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, {icon: 2})
                }
                // console.log(res);
                layer.msg(res.message, { icon: 1 });
                // 将登录成功后的token存到本地localStorage
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        });
    })
})