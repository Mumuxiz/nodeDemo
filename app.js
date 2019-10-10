/**
 * Created by zmm.
 * Date: 2019/08/29 17:05
 * Describe:
 */

/**
 * 1、引入express模块、日志模板和小图标、post请求模块
 */
const express = require('express');
const logger = require('morgan');
// const favicon = require('serve-favicon');
const bodyParser = require('body-parser')
const router = require('./routes/router')
const cors = require('cors')


/**
 * 2、调用express
 */
// 执行express全局函数，返回express对象
const app = express();


/**
 * 3、配置express基础设置
 */
// 配置日志模板,配置为开发者模式
app.use(logger('dev'));
// 配置小图标
// app.use(favicon(__dirname+'/public/img/favicon.ico'))


/**
 * 4、配置post请求方式
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


/**
 * 5、跨域设置
 */
// app.use("*",(req,resp,next)=>{
//     resp.header("Access-Control-Allow-Origin","*");//允许所有来源访问
//     resp.header("Access-Control-Allow-Headers","X-Requested-With");//响应头设置
//     resp.header("Access-Control-Allow-Method","POST,GET,DELETE,OPTIONS");//允许访问的形式
//     resp.header("Content-Type","application/json;charset=utf-8");
//     next();
// });
app.use(cors());

/**
 * 6、调用路由
 */
app.use(router); //把监听的方法，级别提高至静态资源之前。


/**
 * 7、配置静态资源路径
 */
app.use(express.static(__dirname+"/public"));  //__dirname表示当前路径的根目录


/**
 * 8、给服务器设置监听端口
 */
app.set("port",8888);
app.listen(app.get("port"),()=>{
    console.log("服务器启动了!:"+app.get("port"));
});
