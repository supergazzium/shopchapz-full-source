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





router.post('/list_of_all_stores', function (req, res, next) {
    var data = [];
    var k = 0;
    var sql = 'select store_id,store_name,store_owner_name,store_description,status,store_link,store_phone_number,store_logo,active_on,inactive_on,clicks,product_type from store';
    connection.query(sql, function (err1, res1) {
        if (err1) {
            var msg = 'some error occured';
            sendResponse.sendErrorMessage(err1, res);
        } else {
            for (var i = 0; i < res1.length; i++) {
                var sql1 = 'select avg(rating) as avg_rating from ratings where store_id = ?';
                var values1 = [res1[i].store_id];
                connection.query(sql1, values1, function (err2, res2) {
                    i = k;
                    if (err2) {
                        var msg = 'some error occured';
                        sendResponse.sendErrorMessage(err2, res);
                    } else {
                        data[i] = {
                            "store": res1[i], rating: res2
                        }
                        if (i == res1.length - 1) {
                            sendResponse.sendSuccessData(data, res);
                        }
                    }
                    k++;
                })
            }

        }
    })
})


router.post('/user_signup', function (req, res, next) {
    var email = req.body.email;
    var password = md5(req.body.password);
    var contact = req.body.contact;
    var name = req.body.name;
    var manValues = [email, password, contact, name];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            check_email_availability(res, email, callback);
        }
    ],
        function () {
            var date = new Date();
            var access_token = shortid.generate();
            var sql = 'insert into users(email,password,name,access_token,contact,type,created_on) values(?,?,?,?,?,?,?)';
            var values = [email, password, name, access_token, contact, 1, date];
            connection.query(sql, values, function (err1, res1) {
                if (err1) {
                    var msg = 'some error occured';
                    sendResponse.sendErrorMessage(msg, res);
                } else {
                    var user_id = { user_id: res1.insertId };
                    console.log(user_id);
                    sendResponse.sendSuccessData(user_id, res);
                }
            })
        })
})


router.post('/update_profile', function (req, res, next) {
    var user_id = req.body.user_id;
    var name = req.body.name;
    var contact = req.body.contact;
    var address = req.body.address;
    var state = req.body.state;
    var city = req.body.city;
    var country = req.body.country;
    async.waterfall([
        function (callback) {
            checkUser2(res, user_id, callback);
        }
    ],
        function () {
            var sql = 'update users set name=?,contact=?,address=?,state=?,city=?,country=? where user_id = ?';
            var values = [name, contact, address, state, city, country, user_id];
            connection.query(sql, values, function (err, res1) {
                if (err) {
                    var msg = 'some error occured';
                    sendResponse.sendErrorMessage(err, res);
                } else {
                    var msg = 'Information Updated Successfully';
                    sendResponse.sendSuccessData(msg, res);
                }
            })
        })
})


/*
 * --------------------------------------------------------------------------
 * login in facebook
 * ---------------------------------------------------------------------------
 */

router.post('/auth/facebook', function (req, res) {
    console.log("in facebook")
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name', 'gender', 'birthday'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: "",
        redirect_uri: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.

    request.get({ url: accessTokenUrl, qs: params, json: true }, function (err, response, accessToken) {
        if (response.statusCode !== 200) {
            return res.status(500).send({ message: accessToken.error.message });
        }
        request.get({ url: graphApiUrl, qs: accessToken, json: true }, function (err, response, profile) {
            if (response.statusCode !== 200) {
                return res.status(500).send({ message: profile.error.message });
            }
            var sql2 = 'select * from users where email = ?';
            var values2 = [profile.email];
            connection.query(sql2, values2, function (err3, res3) {
                if (err3) {
                    var msg = 'some error occured';
                    console.log(err3)
                    sendResponse.sendErrorMessage(err3, res);
                } else {
                    
                    if (res3.length > 0) {
                        var sql = 'update users set type = ?,fb_id = ? where email = ?';
                        var values = [1,profile.id, profile.email];
                        connection.query(sql, values, function (err1, res1) {
                            if (err1) {
                                var msg = 'some error occured';
                                console.log(err1);
                                sendResponse.sendErrorMessage(err1, res);
                            } else {
                                var sql1 = 'select user_id,email,access_token,contact from users where email = ?';
                                var values1 = [profile.email];
                                connection.query(sql1, values1, function (err2, res2) {
                                    if (err2) {
                                        var msg = 'some error occured';
                                        console.log(err2);
                                        sendResponse.sendErrorMessage(err2, res);
                                    } else {
                                        if (res2.length > 0) {
                                            sendResponse.sendSuccessData(res2, res);
                                        } else {
                                            var msg = 'No Data Found';
                                            sendResponse.sendErrorMessage(msg, res);
                                        }
                                    }
                                })
                            }
                        })
                    } else {
                        console.log(profile)
                        var first_name = profile.first_name;
                        var last_name = profile.last_name;
                        var email = profile.email;
                        var fb_id = profile.id;
                        var password = "";
                        var access_token = shortid.generate();
                        var loginTime = new Date();
                        var name = first_name + ' ' + last_name;
                        var sql = 'insert into users(email,name,fb_id,access_token,created_on) values(?,?,?,?,?)';
                        var values = [email, name, fb_id, access_token, loginTime];
                        connection.query(sql, values, function (err, res6) {
                            if (err) {
                                var msg = 'some error occured';
                                console.log(err);
                                sendResponse.sendErrorMessage(err, res);
                            } else {
                                var user_id = { user_id: res6.insertId };
                                var sql9 = 'select * from users where user_id = ?';
                                var values9 = [res6.insertId];
                                connection.query(sql9,values9,function(err9,res9){
                                    if(err9){
                                        var msg = 'some error occured';
                                        console.log(err9)
                                        sendResponse.sendErrorMessage(err9,res);
                                    }else{
                                        sendResponse.sendSuccessData(res9,res);
                                    }
                                })
                                
                            }
                        })
                    }
                }
            })
        });
    });
});



router.post('/user_login', function (req, res, next) {
    var email = req.body.email;
    var password = md5(req.body.password);
    var data = [];
    var manValues = [email, password];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            checkUser1(res, email, callback)
        }
    ],
        function () {
            var date = new Date();
            var sql = "SELECT * FROM users WHERE `email`= ? and type = ?";
            var values = [email, 1];
            connection.query(sql, values, function (err, rows) {
                if (err) {
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    if (rows.length > 0) {
                        if (rows[0].password === password) {
                            var sql1 = 'select user_id,email,access_token,address,state,city,country from users where user_id = ?';
                            var values1 = [rows[0].user_id];
                            connection.query(sql1, values1, function (err2, res2) {
                                if (err2) {
                                    var msg = 'some error occured';
                                    sendResponse.sendErrorMessage(err2, res);
                                } else {
                                    if (res2 != '' || res2 != null) {
                                        sendResponse.sendSuccessData(res2, res);
                                    } else {
                                        var msg = 'No Data Found';
                                        sendResponse.sendErrorMessage(msg, res);
                                    }
                                }
                            })
                        } else {
                            var errorMsg = 'Email or password is incorrect.';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        }
                    } else {
                        var msg = "You are not registered with us.Please register first";
                        sendResponse.successStatusMsg(msg, res);
                    }
                }
            });
        });
});


router.post('/ratings', function (req, res, next) {
    var status = req.body.status;
    var user_id = req.body.user_id;
    var store_id = req.body.store_id;
    var rating = req.body.rating;
    var manValues = [status, user_id, store_id];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }
    ],
        function () {
            var date = new Date();
            if (status == 0 || status == '0') {
                var sql2 = 'select name from users where user_id = ?';
                var values2 = [user_id];
                connection.query(sql2, values2, function (err3, res3) {
                    if (err3) {
                        var msg = 'some error occured';
                        sendResponse.sendErrorMessage(msg, res);
                    } else {
                        var sql = 'insert into ratings(user_id,store_id,rating,username,created_on) values(?,?,?,?,?)';
                        var values = [user_id, store_id, rating, res3[0].name, date];
                        connection.query(sql, values, function (err1, res1) {
                            if (err1) {
                                var msg = 'some error occured';
                                sendResponse.sendErrorMessage(msg, res);
                            } else {
                                var sql1 = 'select * from ratings where store_id = ? and user_id = ?';
                                var values1 = [store_id, user_id];
                                connection.query(sql1, values1, function (err2, res2) {
                                    if (err2) {
                                        var msg = 'some error occured';
                                        sendResponse.sendErrorMessage(msg, res);
                                    } else {
                                        sendResponse.sendSuccessData(res2, res);
                                    }
                                })
                            }
                        })
                    }
                })

            } else if (status == 1 || status == '1') {
                var sql = 'update ratings set rating=? where user_id = ? and store_id = ?';
                var values = [rating, user_id, store_id];
                connection.query(sql, values, function (err1, res1) {
                    if (err1) {
                        var msg = 'some error occured';
                        sendResponse.sendErrorMessage(msg, res);
                    } else {
                        if (res1 != undefined) {
                            var sql1 = 'select * from ratings where store_id = ? and user_id = ?';
                            var values1 = [store_id, user_id];
                            connection.query(sql1, values1, function (err2, res2) {
                                if (err2) {
                                    var msg = 'some error occured';
                                    sendResponse.sendErrorMessage(msg, res);
                                } else {
                                    if ((res2 != '' || res2 != null) && res2.length > 0) {
                                        sendResponse.sendSuccessData(res2, res);
                                    } else {
                                        var msg = 'No data found';
                                        sendResponse.sendErrorMessage(msg, res);
                                    }

                                }
                            })
                        } else {
                            console.log('h2');
                            var msg = 'Please enter valid data';
                            sendResponse.sendErrorMessage(msg, res);
                        }
                    }
                })
            }

        }
    )
})


router.post('/comments', function (req, res, next) {
    var status = req.body.status;
    var user_id = req.body.user_id;
    var store_id = req.body.store_id;
    var comment = req.body.comment;
    var manValues = [status, user_id, store_id];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }
    ],
        function () {
            var date = new Date();
            if (status == 0 || status == '0') {
                var sql2 = 'select name from users where user_id = ?';
                var values2 = [user_id];
                connection.query(sql2, values2, function (err3, res3) {
                    if (err3) {
                        var msg = 'some error occured';
                        sendResponse.sendErrorMessage(msg, res);
                    } else {
                        var sql = 'insert into comments(user_id,store_id,comment,username,created_on) values(?,?,?,?,?)';
                        var values = [user_id, store_id, comment, res3[0].name, date];
                        connection.query(sql, values, function (err1, res1) {
                            if (err1) {
                                var msg = 'some error occured';
                                sendResponse.sendErrorMessage(msg, res);
                            } else {
                                var sql1 = 'select * from comments where store_id = ? and user_id = ?';
                                var values1 = [store_id, user_id];
                                connection.query(sql1, values1, function (err2, res2) {
                                    if (err2) {
                                        var msg = 'some error occured';
                                        sendResponse.sendErrorMessage(msg, res);
                                    } else {
                                        sendResponse.sendSuccessData(res2, res);
                                    }
                                })
                            }
                        })
                    }
                })

            } else if (status == 1 || status == '1') {
                var sql = 'update comments set comment=? where user_id = ? and store_id = ?';
                var values = [comment, user_id, store_id];
                connection.query(sql, values, function (err1, res1) {
                    if (err1) {
                        var msg = 'some error occured';
                        sendResponse.sendErrorMessage(msg, res);
                    } else {
                        if (res1 != undefined) {
                            var sql1 = 'select * from comments where store_id = ? and user_id = ?';
                            var values1 = [store_id, user_id];
                            connection.query(sql1, values1, function (err2, res2) {
                                if (err2) {
                                    var msg = 'Data Updated successfully';
                                    sendResponse.sendErrorMessage(msg, res);
                                } else {
                                    if ((res2 != '' || res2 != null) && res2.length > 0) {
                                        sendResponse.sendSuccessData(res2, res);
                                    } else {
                                        var msg = 'No data found';
                                        sendResponse.sendErrorMessage(msg, res);
                                    }

                                }
                            })
                        } else {
                            console.log('h2');
                            var msg = 'Please enter valid data';
                            sendResponse.sendErrorMessage(msg, res);
                        }
                    }
                })
            }

        }
    )
})


router.post('/get_rating_and_comment', function (req, res, next) {
    var store_id = req.body.store_id;
    var manValues = [store_id];
    var data = [];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function(callback){
            checkStoreId(res,store_id,callback);
        }
    ],
        function () {
            var sql = 'select store_name,clicks from store where store_id = ?';
            var values = [store_id];
            connection.query(sql, values, function (err1, res1) {
                if (err1) {
                    var msg = 'some error occured';
                    sendResponse.sendErrorMessage(msg, res);
                } else {
                    var sql1 = 'select id,user_id,store_id,rating,created_on,updated_on,username,(select avg(rating) from ratings where store_id = ?) as average_rating from ratings where store_id = ?';
                    var values1 = [store_id,store_id];
                    connection.query(sql1, values1, function (err2, res2) {
                        if (err2) {
                            var msg = 'some error occured';
                            sendResponse.sendErrorMessage(msg, res);
                        } else {
                            var sql2 = 'select * from comments where store_id = ?';
                            var values2 = [store_id];
                            connection.query(sql2, values2, function (err3, res3) {
                                if (err3) {
                                    var msg = 'some error occured';
                                    sendResponse.sendErrorMessage(msg, res);
                                } else {
                                    data = {
                                        "store": { store_id: store_id, store_name: res1[0].store_name ,clicks:res1[0].clicks},
                                        "ratings": res2,
                                        "comments": res3
                                    };
                                    sendResponse.sendSuccessData(data, res);
                                }
                            })
                        }
                    })
                }
            })
        })
})


router.post('/contact_us', function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var contact = req.body.contact;
    var message = req.body.message;
    var manValues = [name, email];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }
    ],
        function () {
            // var sql = 'select user_id from store where store_id = ?';
            // var values = [store_id];
            // connection.query(sql, values, function (err1, res1) {
            //     if (err1) {
            //         var msg = 'some error occured1';
            //         sendResponse.sendErrorMessage(err1, res);
            //     } else {
                    var sql1 = 'select email from users where type = ?';
                    var values1 = [2];
                    connection.query(sql1, values1, function (err2, res2) {
                        if (err2) {
                            var msg = 'some error occured2';
                            sendResponse.sendErrorMessage(msg, res);
                        } else {
                            console.log(res2);
                            var str = "<p>Dear Admin,</p>";
                            str += "<p>" + name + " have a query.</p>";
                            str += "<p>Below are full details :</p>";
                            str += "<p>From: " + email + "<p>";
                            str += "<p>Contact Number: " + contact + "<p>";
                            str += "<p>Message: <b>" + message + "</b><p>";
                            str += "<p>Regards,</p>";
                            str += "<p>Team Shopchapz.</p>";

                            var mailOptions = { to: res2[0].email, subject: 'Contact', html: str };
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error)
                                    var errorMsg = 'some error occurred3';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    var msg = 'Your message have been sent successfully';
                                    sendResponse.sendSuccessData(msg, res);
                                }
                            })
                        }
                    })
            //     }
            // })
        }
    )
})


router.post('/clicks',function(req,res,next){
    if(req.body.store_id == 'undefined' || req.body.store_id == undefined){
        var msg = 'store_id is missing';
        sendResponse.sendErrorMessage(msg,res);
    }else{
        var store_id = req.body.store_id;
        var manValues = [store_id];
        async.waterfall([
            function(callback){
                func.checkBlank(res,manValues,callback);
            },
            function(callback){
                checkStoreId(res,store_id,callback);
            }
        ],
    function(){
        var sql1 = 'update store set clicks = clicks + 1 where store_id = ?';
        var values1 = [store_id];
        connection.query(sql1,values1,function(err1,res1){
            if(err1){
                var msg = 'some error occured';
                sendResponse.sendErrorMessage(msg,res);
            }else{
                if(res1.changedRows > 0){
                    var msg = 'Click added';
                    var sql2 = 'select clicks from store where store_id = ?';
                    var values2 = [store_id];
                    connection.query(sql2,values2,function(err2,res2){
                        if(err2){
                            var msg = 'some error occured';
                            sendResponse.sendErrorMessage(msg,res);
                        }else{
                            var data = {clicks:res2[0].clicks};
                            sendResponse.sendSuccessData(data,res);
                        }
                    })
                }
            }
        })
    })
    }
})


router.post('/get_user_details',function(req,res,next){
    var user_id = req.body.user_id;
    var manValues = [user_id];
    async.waterfall([
        function(callback){
            func.checkBlank(res,manValues,callback);
        }
    ],
    function(){
        var sql = 'select * from users where user_id = ?';
        var values1 = [user_id];
        connection.query(sql,values1,function(err1,res1){
            if(err1){
                var msg = 'some error occured';
                sendResponse.sendErrorMessage(msg,res);
            }else{
                sendResponse.sendSuccessData(res1,res);
            }
        })
    }    
)
})



// router.post('/search', function (req, res, next) {
//     var text = req.body.text;
//     async.waterfall([
//         function (callback) {
//             func.checkBlank(res, text, callback);
//         }
//     ],
//         function () {
//             var sql = "select * from store where store_name like '%"+ text+"%' or product_type like '%"+text+"%' or store_description like '%"+text+"%'";
//             console.log(sql);
//             connection.query(sql,function(err1,res1){
//                 if(err1){
//                     var msg = 'some error occured';
//                     sendResponse.sendErrorMessage(err1,res);
//                 }else{
//                     if(res1.length > 0){
//                         sendResponse.sendSuccessData(res1,res);
//                     }else{
//                         var msg = 'No record found';
//                         sendResponse.sendSuccessData(msg,res);
//                     }
//                 }
//             })
//         })
// })


function check_email_availability(res, email, callback) {
    var sql = "SELECT `email` FROM `users` WHERE `email`=? limit 1";
    var values = [email];
    connection.query(sql, values, function (err, userResponse) {
        console.log(userResponse);
        if (userResponse.length) {
            var errorMsg = email + ' is already registered with us.';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            callback();
        }
    });
}

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

function checkUser2(res, user_id, callback) {
    var sql = "SELECT * FROM users WHERE `user_id`=? limit 1";
    var values = [user_id];
    connection.query(sql, values, function (err, userResponse) {
        if (userResponse.length == '0' || userResponse.length == 0) {
            var errorMsg = 'Invalid Attempt';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            callback();
        }
    });
}

function checkStoreId(res, store_id, callback) {
    var sql = "SELECT * FROM store WHERE `store_id`=? limit 1";
    var values = [store_id];
    connection.query(sql, values, function (err, userResponse) {
        if (userResponse.length == '0' || userResponse.length == 0) {
            var errorMsg = 'Invalid Store id';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else {
            callback();
        }
    });
}

module.exports = router;