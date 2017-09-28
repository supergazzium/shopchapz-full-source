var express = require('express');
var router = express.Router();
var async = require('async');
var randomstring = require('randomstring');
var md5 = require('md5');
var request = require('request');
var func = require('./../commonfunction');
var sendResponse = require('./../sendresponse');
var shortid = require('shortid');
var generator = require('generate-password');
var path1 = require('path');
// var xlsx = require('node-xlsx');
var fs = require('fs');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('/super_admin_login', function (req, res, next) {
    var password = md5(shortid.generate());
    var access_token = shortid.generate();
    var email = req.body.email;
    var password = md5(req.body.password);
    var manValues = [email, password];
    var data = [];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            checkUser1(res, email, callback);
        }
    ],
        function () {
            var sql = 'select * from users where type = ? and email = ? limit 1';
            var values = [2, email];
            connection.query(sql, values, function (err1, res1) {
                if (err1) {
                    var msg = 'some error occured';
                    sendResponse.sendErrorMessage(msg, res);
                } else {
                    if(res1.length>0){
                    console.log(password)
                    if (res1[0].password == password) {
                        data = { user_id: res1[0].user_id, email: res1[0].email, access_token: res1[0].access_token };
                        sendResponse.sendSuccessData(data, res);
                    } else {
                        var msg = 'enter valid password';
                        sendResponse.sendErrorMessage(msg, res);
                    }
                }else{
                    var msg = 'enter valid email id';
                    sendResponse.sendErrorMessage(msg,res);
                }
                }
            })
        })
})


router.post('/active_inactive_store', function (req, res, next) {
    var status = req.body.status;
    var store_id = req.body.store_id;
    var manValues = [status, store_id];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }
    ], function () {
        var sql1 = 'select store_name,user_id from store where store_id = ?';
        var values1 = [store_id];
        connection.query(sql1, values1, function (err2, res2) {
            if (err2) {
                var msg = 'some error occured';
                sendResponse.sendErrorMessage(msg, res);
            } else {
                if (res2.length > 0) {
                    var sql2 = 'select email from users where user_id = ?';
                    var values2 = [res2[0].user_id];
                    connection.query(sql2, values2, function (err3, res3) {
                        if (err3) {
                            var msg = 'some error occured';
                            sendResponse.sendErrorMessage(msg, res);
                        } else {
                            var date = new Date();
                            var user_id = res2[0].user_id;
                            if (status == 0) {
                                var sql = 'update store set status = ?, inactive_on = ? where store_id = ?';
                            } else {
                                var sql = 'update store set status = ?,active_on = ? where store_id = ?';
                            }
                            // var sql = 'update store set status = ? where store_id = ?';
                            var values = [status, date, store_id];
                            connection.query(sql, values, function (err1, res1) {
                                if (err1) {
                                    var msg = 'some error occured';
                                    sendResponse.sendErrorMessage(msg, res);
                                } else {
                                    if (status == 0 || status == '0') {
                                        var str = "<p>Hi Admin,</p>";
                                        str += "<p>This mail is sent to you to inform that your store " + res2[0].store_name + " has been Deactivated.</p>";
                                        str += "<p>If you have any query regarding this topic, please contact Admin..</p>";
                                        str += "<p>Regards,</p>";
                                        str += "<p>Team Shopchapz</p>";
                                        var subject = 'Store Deactivation';
                                        var msg = 'Store is deactivated successfully';
                                    } else {
                                        // var str = "<p>Hi Admin,</p>";
                                        // str += "<p>This mail is sent to you to inform that your store " + res2[0].store_name + " has been Activated.</p>";
                                        // str += "<p>If you have any query regarding this topic, please contact Admin..</p>";
                                        // str += "<p>Regards,</p>";
                                        // str += "<p>Team Shopchapz</p>";
                                        // var subject = 'Store Activation';
                                        // var msg = 'Store is activated successfully';
                                        var str = "<p>ยินดีต้อนรับเข้าสู่การขายของไร้ขีดจำกัด</p>";
                                        str += "<p>ร้านค้าของได้ออกสู่สายตาของนักช้อปบนโลกออนไลเรียบร้อยแล้ว</p>";
                                        str += "<p>คุณสามารถค้นหาร้านของคุณได้บนเวปไซต์ได้แล้ว</p>";
                                        str += "<p>ขอให้คุณมียอดขายเยอะๆ น่ะครับ</p>";
                                        str += "<p>หากมีปัญหากรุณาติดต่อ shopchapz@gmail.com</p>";
                                        str += "<p>Regards,</p>";
                                        str += "<p>Team Shopchapz</p>";
                                        var subject = 'Store Activation';
                                        var msg = 'Store is activated successfully';
                                    }
                                    var mailOptions = { to: res3[0].email, subject: subject, html: str };
                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            console.log(error)
                                            var errorMsg = 'some error occurred';
                                            sendResponse.sendErrorMessage(errorMsg, res);
                                        } else {
                                            var data = { status: status, date: date };
                                            sendResponse.sendSuccessData(data, res);
                                        }
                                    })
                                }
                            })
                        }
                    })

                } else {
                    console.log(res2.length);
                    var msg = 'store name not found'
                    sendResponse.sendErrorMessage(msg, res);
                }
            }
        })
    })
})


router.post('/all_users', function (req, res, next) {
    var access_token = req.body.access_token;
    async.waterfall([
        function (callback) {
            func.checkBlank(res, access_token, callback);
        },
        function (callback) {
            func.checkUser(res, access_token, callback);
        }
    ], function () {
        var sql = 'select user_id,email,name,contact from users where type = ?';
        var values = [1];
        connection.query(sql, values, function (err1, res1) {
            if (err1) {
                var msg = 'some error occured';
                sendResponse.sendErrorMessage(msg, res);
            } else {
                sendResponse.sendSuccessData(res1, res);
            }
        })
    })
})


router.post('/delete', function (req, res, next) {
    if (req.body.access_token == undefined || req.body.access_token == 'undefined' || req.body.status == undefined || req.body.status == 'undefined' || req.body.id == undefined || req.body.id == 'undefined') {
        var msg = 'some parameters missing';
        sendResponse.sendErrorMessage(msg, res);
    } else {
        var manValues = [req.body.access_token, req.body.status, req.body.id];
        async.waterfall([
            function (callback) {
                func.checkBlank(res, manValues, callback);
            },
            function (callback) {
                func.checkUser(res, req.body.access_token, callback);
            },
            function (callback) {
                func.checkId(res, req.body.id,req.body.status, callback);
            }
        ],
            function () {
                if (req.body.status == 0 || req.body.status == '0'){
                    var sql = 'delete store,users from store join users on store.user_id = users.user_id where store.store_id = ?';
                }else{
                    var sql = 'delete from users where user_id = ?';
                }
                var values = [req.body.id];
                connection.query(sql,values,function(err1,res1){
                    if(err1){
                        var msg = 'some error occured';
                        sendResponse.sendErrorMessage(msg,res);
                    }else{
                        var msg = 'deletion done successfully';
                        sendResponse.sendSuccessData(msg,res);
                    }
                })
            }
        )
    }
})


function checkUser1(res, email, callback) {
    var sql = "SELECT * FROM users WHERE `email`=? limit 1";
    var values = [email];
    connection.query(sql, values, function (err, userResponse) {
        if (userResponse.length == '0' || userResponse.length == 0) {
            var errorMsg = 'Invalid Attempt';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            callback();
        }
    });
}

module.exports = router;