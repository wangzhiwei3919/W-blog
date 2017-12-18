/**
 **********************************************************
 *
 *
 * @author      wangzhiwei.
 * @date        2017/12/5.
 * @time        10:37.
 * @versions    0.0.0
 *
 *
 *********************************************************
 */
var express = require('express');
var router = express.Router();
var dbMethod = require('../db/db');
var formatDate = require('../public/utils/dateFormat')
// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// 定义网站主页的路由
router.get('/get', function(req, res) {
    dbMethod.find(req.query,(result)=>{
        res.send({
            status:0,
            list:result
        });
    });

});

router.post('/add', function(req, res) {
    req.body.date = formatDate('yyyy-MM-dd HH:mm:ss');
    dbMethod.insert([req.body],(result)=>{
        res.send({
            status:0,
            list:result
        });
    });
});


router.post('/update', function(req, res) {
    dbMethod.update({_id:req.body._id},req.body,(result)=>{
        res.send({
            status:0,
            message:'成功'
        });
    });
});

module.exports = router;