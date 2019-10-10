/**
 * Created by Mireia.
 * Date: 2019/09/10 11:26
 * Describe: 管理员模块操作
 */
// 引入model层
const adminModel = require('../model/admin');

const controller = {
    // 获取验证码
    getCode (request,response) {
        adminModel.getCode().then(data => {
            response.send(data)
        }).catch(error => {
            response.send(error)
        })
    },
    // 登录验证
    loginByPwd (request,response) {
        // 获取用户输入的数据
        console.log('获取用户输入的数据', request);
        let name = request.body.userName;
        let pwd = request.body.pass;
        adminModel.loginByPwd(request.body).then(data => {
            response.send(data)
        }).catch(error => {
            response.send(error)
        })
    },
    // 根据前端配置生成初始操作权限菜单
    addAction (request,response) {
        console.log(request.body);
        let body = request.body;
        let params = [body.action_name, body.action_code, body.action_desc, body.parent_code, body.type, body.is_check, body.parent_id];
        adminModel.addAction(params).then(data => {
            response.send(data)
        }).catch(error => {
            response.send(error)
        })
    },
    // 编辑权限
    editAction (request,response) {
        console.log('编辑权限', request.body);
        let body = request.body;
        let params = [body.parent_code, body.action_name, body.action_code, body.action_desc, +body.type, +body.is_check, +body.parent_id, +body.action_id];
        adminModel.editAction(params).then(data => {
            response.send(data)
        }).catch(error => {
            response.send(error)
        })
    },
    // 查询操作权限
    actionList (request, response) {
        adminModel.actionList().then(data => {
            response.send(data)
        }).catch(error => {
            response.send(error)
        })
    },
    // 删除操作权限
    removeAction (request, response) {
        console.log(request);
        let params = request.body.action_ids;
        adminModel.removeAction(params).then(data => {
            response.send(data)
        }).catch(error => {
            response.send(error)
        })
    }
};

module.exports=controller;
