/**
 * Created by Mireia.
 * Date: 2019/09/10 16:42
 * Describe: 错误码及提示语
 */
const code = {
    0: '请求成功',
    1: '账号或密码错误',
    2: '账号不存在',
    3: '数据不存在',
    1000: '操作失败'
};

function errorCode (num, data = null) {
    if (num === 0) {
        return {
            code: num,
            data: data
        }
    } else {
        return {
            code: num,
            data: data,
            message: code[num]
        }
    }
}


module.exports = errorCode;
