import Taro, { getStorageSync, showToast, navigateTo } from "@tarojs/taro";
var isRun = true;
// 定义拦截器，在请求出发前或出发后做一些额外操作
const interceptor = function(chain) {
    //  请求参数
    const reParms = chain.requsetParams
    const {methods,data,url} = reParms
    const token = getStorageSync("token");
    if (token) {
        // 为请求头添加token
        reParms.header["Authorization"] = token;
        requestParams.header["Source"] = 2;
    }
    // 必须调用 chain.proceed(requestParams) 以调用下一个拦截器或发起请求。
    //请求拦截器
    return chain.proceed(requestParams).then((res) => {
        // 响应拦截器，后期代码重构可以返回res.data;
        switch (res.statusCode) {
        case 401:
            // 节流 防止多次跳转
            // throttle( () =>{
            if(isRun){
                isRun = false;
                showToast({
                title: "对不起，您未登录",
                icon: "none",
                });
                navigateTo({
                url: "/pages/User/getPhone",
                });
                setTimeout(function() {
                isRun = true;
                }, 1000);// 一秒内不能重复执行
            }
            // }, 500);
            break;
        }
        return res;
    })
    .catch((err) => {
        console.log(err, "err");
        showToast({
        title: "网络出现异常，请稍后重试",
        icon: "none",
        });
        // handleResponseErr(err)();
    });
}
// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。

Taro.addInterceptor(interceptor);

let request 
// request[method] = async (url,_params,isJson = true) => {
//     try {
//         const response = await Taro.re
//     }
// }