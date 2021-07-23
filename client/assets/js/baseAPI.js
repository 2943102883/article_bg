// 每次调用$.get()或$.post()或$.ajax()的时候
// 会先调用这个函数
// 在这个函数中，可以拿到我们给ajax提供的url
$.ajaxPrefilter(function (options) {
    // 在发起真正的ajax之前，拼接路径
    // options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    options.url = 'http://localhost:8080' + options.url

    if (options.url.indexOf('/my/') !== -1) {
        // 统一为有权限的接口设置headers请求头
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //不知道为啥，没有这句话，下面的那个complete挂载不上
    // options.success = function (res) {
    //     if (res.status !== 0) {
    //         console.log('测试0000000000');
    //     }
    // }
    // 全局统一挂载 complete 回调函数
    options.complete = function (res) {
        // console.log('执行了 complete 回调：')
        // console.log(res)
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
    }

}
)