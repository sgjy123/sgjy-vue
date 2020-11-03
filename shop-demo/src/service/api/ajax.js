import axios from 'axios'

export default function ajax(url = '', parmas = {}, type = 'GET') {
    // 1.定义变量
    let promise;
    // 2.返回一个promise对象
    return new Promise((resolve, reject) => {
        // 2.1判断是什么类型的请求
        if (type.toUpperCase() === 'GET') { // GET请求
            // 2.1.1拼接字符串
            let parmasStr = '';
            // 2.1.2遍历所有的参数
            Object.keys(parmas).forEach(key => {
                parmasStr = key + '=' + parmas[key] + '&';
            });
            // 2.1.3过滤最后的&
            if (parmasStr) {
                parmasStr = parmasStr.substr(0, parmasStr.lastIndexOf('&'));
            }
            // 2.1.4整合完整路径
            url += '?' + parmasStr;
            // 2.1.5发起请求
            promise = axios.get(url);
        } else if (type.toUpperCase() === 'POST') { // POST请求
            // 2.1.6发起post请求
            promise = axios.post(url, parmas);
        }
        // 2.2处理结果并返回
        promise.then((response) => {
            resolve(response.data);
        }).catch(error=>{
            reject(error);
        });
    })
}
