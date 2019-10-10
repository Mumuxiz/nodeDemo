"use strict"
/**
 * Created by zmm.
 * Date: 2019/08/29 18:03
 * Describe:
 */
const express=require("express");  //加载express模块
const router=express.Router();  //获取路由对象
const adminController = require('../controller/admin')

module.exports=router; //公开router


// 接口
router.get('/code', adminController.getCode);

// 登录
router.post('/login', adminController.loginByPwd);

// 根据前端配置生成初始操作权限菜单
router.post('/addAction', adminController.addAction);

// 编辑权限
router.post('/editAction', adminController.editAction);

// 查询所有操作权限
router.get('/actionList', adminController.actionList);

// 删除操作权限
router.post('/removeAction', adminController.removeAction);
