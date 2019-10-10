/**
 * Created by Mireia.
 * Date: 2019/09/10 11:17
 * Describe: 配置数据库连接池
 */
// 引入mysql模块
const mysql = require('mysql')

//=====2.创建一个对象
const dbPool={
    pool:{},  //定义一个连接池对象pool
    config:{  //设置这个pool的基础配置
        host:'localhost',
        port:'3306',
        user:'root',
        password:'root',
        database:'demodata'
    },
    create(){ //创建连接池对象
        this.pool=mysql.createPool(this.config);
    },
    connect(sql,arr,fn){   //连接连接池
        this.pool.getConnection((err,connection)=>{
            connection.query(sql,arr,fn);
            connection.release();  //释放连接
        })
    }
};

dbPool.create();  //实例化连接池对象

//=====3.公开对象
module.exports=dbPool;
