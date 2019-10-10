/**
 * Created by Mireia.
 * Date: 2019/09/10 11:21
 * Describe: 管理员模块
 */
// 引入数据库连接池模块
const dbpool = require('../config/dbpool');
// 引入错误码提示语
const errorCode = require('../config/errorCode');

// 使用sql插件mysqls
let { init, exec, sql, transaction } = require('mysqls');
init({
    host: 'localhost',
    user: 'root',
    password:'123456',
    database: 'demodata',
    port: 3306,
});

const adminModel = {
    // 获取验证码
    getCode () {
        return new Promise((resolve,reject) => {
            let strCode = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
            let codeArr = strCode.split('');
            let code = '';
            for (let i = 0; i < 4; i++) {
                code += codeArr[Math.round(Math.random()*codeArr.length)]
            }
            resolve(errorCode(0, code))
        })
    },
    // 判断登录用户是否存在
    loginByPwd(param){
        console.log('这是参数++', param);
        let pro = new Promise((resolve,reject)=>{
            //调用数据库连接池连接数据库并查询SQL语句
            let newSql = sql
                .table('admin')
                .where({name:param.userName,pwd:param.pass})
                .select();
            dbpool.connect(newSql,(error,data)=>{
                if(!error){
                    if (data.length) {
                        resolve(errorCode(0))
                    } else {
                        resolve(errorCode(2));
                    }
                }else {
                    reject(error);
                }
            })
        });
        return pro;
    },
    // 根据前端配置生成初始操作权限菜单
    addAction (param) {
        let pro = new Promise((resolve,reject)=>{
            //调用数据库连接池连接数据库并查询SQL语句
            let sql='INSERT INTO action (action_name,action_code,action_desc,parent_code,type,is_check, parent_id) VALUES (?)';
            dbpool.connect(sql,[param],(error,data)=>{
                if(!error){
                    resolve(errorCode(0, {action_id: data.insertId}))
                }else {
                    reject(errorCode(1000, error));
                }
            })
        });
        return pro;
    },
    // 编辑权限
    editAction (param) {
        let pro = new Promise((resolve,reject)=>{
            //调用数据库连接池连接数据库并查询SQL语句
            let sql='UPDATE action SET parent_code=?,action_name=?,action_code=?,action_desc=?,type=?,is_check=?,parent_id=? WHERE action_id=?';
            console.log(sql);
            dbpool.connect(sql,param,(error,data)=>{
                if(!error){
                    resolve(errorCode(0))
                }else {
                    reject(error);
                }
            })
        });
        return pro;
    },
    // 查询操作权限
    actionList (param) {
        let pro = new Promise((resolve,reject)=>{
            //调用数据库连接池连接数据库并查询SQL语句
            let sql="SELECT * FROM action";
            dbpool.connect(sql,param,(error,data)=>{
                if(!error){
                    resolve(errorCode(0, data))
                }else {
                    reject(error);
                }
            })
        });
        return pro;
    },
    // 删除操作权限
    removeAction (param) {
        let pro = new Promise((resolve,reject)=>{
            //调用数据库连接池连接数据库并查询SQL语句
            let sql="DELETE FROM action WHERE action_id in (?)";
            dbpool.connect(sql,param,(error,data)=>{
                if(!error){
                    resolve(errorCode(0, data))
                }else {
                    reject(error);
                }
            })
        });
        return pro;
    }
};

//公开对象
module.exports = adminModel;
