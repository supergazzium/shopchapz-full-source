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


router.post('/signup', function (req, res, next) {
    var email = req.body.email;
    var password = md5(req.body.password);
    var store_name = req.body.store_name;
    var owner_phone_number = req.body.owner_phone_number;
    var id = req.body.id;
    console.log('id1: ' + id);
    var data = [];
    var j = 1;
    var manValues = [email, password, store_name, owner_phone_number, id];
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
            var sql = 'insert into users(email,password,owner_phone_number,access_token,type,created_on) values(?,?,?,?,?,?)';
            var values = [email, password, owner_phone_number, access_token, 0, date];
            connection.query(sql, values, function (err1, res1) {
                if (err1) {
                    var msg = 'some error occured';
                    sendResponse.sendErrorMessage(err1, res);
                } else {
                    var user_id = res1.insertId;
                    console.log('id2: ' + id);
                    var sql1 = 'insert into store(store_name,id,store_logo,user_id,inactive_on,created_on) values(?,?,?,?,?,?)';
                    var values1 = [store_name, id, '', user_id, date, date];
                    connection.query(sql1, values1, function (err2, res2) {
                        if (err2) {
                            var msg = 'some error occured';
                            sendResponse.sendErrorMessage(err2, res);
                        } else {
                            var store_id = res2.insertId;
                            for (var i = 0; i < 6; i++) {
                                var sql2 = 'insert into images(store_id,image,created_on) values(?,?,?)';
                                var values2 = [store_id, '', date];
                                connection.query(sql2, values2, function (err3, res3) {
                                    i = j;
                                    if (i == 5) {
                                        if (err3) {
                                            var msg = 'some error occured';
                                            sendResponse.sendErrorMessage(err3, res);
                                        } else {
                                            var sql3 = 'select users.user_id,access_token,store_id from users join store on users.user_id = store.user_id where users.user_id = ?';
                                            var values3 = [user_id];
                                            connection.query(sql3, values3, function (err4, res4) {
                                                if (err4) {
                                                    var msg = 'some error occured';
                                                    sendResponse.sendErrorMessage(err4, res);
                                                } else {
                                                    // var sql2 = 'select * from images where store_id = ?';
                                                    // var values2 = [store_id];
                                                    // connection.query(sql2,values2,function(err5,res5){
                                                    //     if(err5){
                                                    //         var msg = 'some error occured';
                                                    //         sendResponse.sendErrorMessage(err5, res);
                                                    //     }else{
                                                    //         // data = {
                                                    //         //     "user":{user_id:res4[0].user_id,email:res4[0].email,owner_phone_number:res4[0].owner_phone_number,access_token:res4[0].access_token},
                                                    //         //     "store":{store_id:res4[0].store_id,id:res4[0].id,images:res5}
                                                    //         // }
                                                    data = { user_id: res4[0].user_id, access_token: res4[0].access_token, store_id: res4[0].store_id }
                                                    sendResponse.sendSuccessData(res4, res);
                                                    //     }
                                                    // })

                                                }
                                            })
                                        }
                                    }
                                    j++;
                                })
                            }
                        }
                    })

                }
            })
        })
})


router.post('/admin_login', function (req, res, next) {
    var email = req.body.email;
    var password = md5(req.body.password);
    var data = [];
    // var encrypt_password = md5(password);
    // console.log('encrypt_password: ' + encrypt_password);
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
            var values = [email, 0];
            connection.query(sql, values, function (err, res1) {
                if (err) {
                    var errorMsg = 'some error occurred';
                    sendResponse.sendErrorMessage(errorMsg, res);
                } else {
                    if (res1.length > 0) {
                        if (res1[0].password == password) {
                            var sql1 = 'select email,id,store.store_id,store.store_name,owner_phone_number,access_token from users join store on users.user_id = store.user_id where users.user_id = ?';
                            var values1 = [res1[0].user_id];
                            connection.query(sql1, values1, function (err2, res2) {
                                if (err2) {
                                    var msg = 'some error occured';
                                    sendResponse.sendErrorMessage(err2, res);
                                } else {
                                    console.log(sql1)
                                    console.log(values1)
                                    if(res2.length > 0){
                                    console.log(res2);
                                    if(res2[0].store_id == 'undefined' || res2[0].store_id == undefined){
                                        data = {user_id:res2[0].user_id,email:res2[0].email,asscess_token:res2[0].access_token,}

                                    }else{
                                    var sql2 = 'select image_id,image from images where store_id = ?';
                                    var values2 = [res2[0].store_id]
                                    connection.query(sql2, values2, function (err3, res3) {
                                        if (err3) {
                                            var msg = 'some error occured';
                                            sendResponse.sendErrorMessage(err2, res);
                                        } else {
                                            if (res3.length > 0) {
                                                data = {
                                                    "user": { user_id: res2[0].user_id, owner_phone_number: res2[0].owner_phone_number, access_token: res2[0].access_token },
                                                    "store": { store_id: res2[0].store_id, store_name: res2[0].store_name, id: res2[0].id, images: res3 }
                                                }
                                            } else {
                                                data = {
                                                    "user": { user_id: res2[0].user_id, owner_phone_number: res2[0].owner_phone_number, access_token: res2[0].access_token },
                                                    "store": { store_id: res2[0].store_id, store_name: res2[0].store_name, id: res2[0].id, images: [] }
                                                }
                                            }
                                            sendResponse.sendSuccessData(data, res);

                                        }
                                    })
                                }
                            }else{
                                var msg = 'No data found';
                                sendResponse.sendErrorMessage(msg,res);
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


//Update Password
router.post('/update_password', function (req, res, next) {
    var verification_token = req.body.verification_token;
    var new_password = md5(req.body.new_password);
    // var encrypt_password = md5(new_password);
    var manValues = [verification_token, new_password];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }],
        function () {
            console.log(verification_token);
            var sql = "SELECT verification_token, password FROM users where verification_token=?";
            var values = [verification_token];
            connection.query(sql, values, function (err, rows) {
                if (err) {
                    console.log("error1")
                    var Msg = 'some error occurred';
                    sendResponse.sendErrorMessage(Msg, res);
                } else {
                    if (rows == "") {
                        var Msg = 'Unauthorised access!';
                        sendResponse.sendErrorMessage(Msg, res);
                    } else {
                        if (verification_token == rows[0].verification_token) {
                            var loginTime = new Date();
                            //var code = func.encrypt(verification_token + loginTime);
                            var code = generator.generate();
                            var sql = "update users set password = ? , verification_token = ? where verification_token = ?";
                            var values = [new_password, code, verification_token];
                            connection.query(sql, values, function (err1, userInsertResult) {
                                if (err1) {
                                    console.log("error2")
                                    var Msg = 'Unauthorised access!';
                                    sendResponse.sendErrorMessage(err1, res);
                                } else {
                                    var Msg = 'password changed successfully';
                                    sendResponse.sendSuccessData(Msg, res);
                                }
                            })
                        }
                    }
                }
                ;
            });
        });
});

//change_password

router.post('/change_password', function (req, res, next) {
    var old_password = md5(req.body.old_password);
    var new_password = md5(req.body.new_password);
    var access_token = req.body.access_token;
    var manValues = [old_password, new_password, access_token];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        },
        function (callback) {
            checkUser(res, access_token, callback);
        }
    ], function () {
        var sql = "SELECT * FROM users where access_token = ? limit 1";
        var values = [access_token];
        connection.query(sql, values, function (err, rows) {
            if (err) {
                var errorMsg = 'some error occurred';
                sendResponse.sendErrorMessage(errorMsg, res);
            } else if (rows == "") {
                var Msg = 'Unauthorised access';
                sendResponse.sendErrorMessage(Msg, res);
            } else if (old_password == rows[0].password) {

                var sql2 = "update users set password = ? where access_token = ?";
                var values2 = [new_password, access_token];

                connection.query(sql2, values2, function (err, rows2) {
                    if (err) {
                        var errorMsg = 'some error occurred.';
                        sendResponse.sendErrorMessage(errorMsg, res);
                    } else if (rows2.affectedRows > 0) {
                        var Msg = 'Password changed successfully.';
                        sendResponse.sendSuccessData(Msg, res);
                    }
                })
            } else {
                var Msg = 'Old password do not match';
                sendResponse.sendErrorMessage(Msg, res);
            }
        });
    })
});

//Forgot Password
router.post('/forgot_password', function (req, res, next) {
    var email = req.body.email;
    var manValues = [email];
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }
    ], function (err, updatePopup, critical) {
        var sql1 = "select * from users where email=?";
        var values1 = [email]
        connection.query(sql1, values1, function (err, rows) {
            if (err) {
                console.log(err)
                var Msg = 'something went wrong';
                sendResponse.sendErrorMessage(Msg, res);
            } else {
                if (rows.length != 0) {
                    var loginTime = new Date();
                    //var verification_token = func.encrypt(email + loginTime);
                    var verification_token = generator.generate();
                    console.log(verification_token);
                    var str = "<p>สวัสดีครับ</p>";
                    str += "<p>คุณได้แจ้งขอเปลี่ยนรหัสผ่าน  กรุณาคลิกลิ้งข้างล่างเพื่อเปลี่ยนรหัสผ่าน</p>";
                    // str += "<p>If you made this request, then please click the below link to reset your password.</p>";
                    str += "<a href="+forgot_password+"?" + verification_token + ">Click Here</a>";
                    str += "<p>หากคุณมีปัญหากรุณาติดต่อ shopchapz@gmail.com</p>"
                    str += "<p>Regards,</p>";
                    str += "<p>Team Shopchapz</p>";

                    var mailOptions = { to: email, subject: 'Password Recovery', html: str };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            var sql = "update users set verification_token = ? where email = ?";
                            var values = [verification_token, email];
                            connection.query(sql, values, function (err, userInsertResult) {
                                if (err) {
                                    var errorMsg = 'some error occurred';
                                    sendResponse.sendErrorMessage(errorMsg, res);
                                } else {
                                    console.log('mail sent')
                                    var Msg = 'mail sent';
                                    sendResponse.sendSuccessData(Msg, res);
                                }
                            })
                        }
                    });
                } else {
                    var msg = "user not registered";
                    sendResponse.sendErrorMessage(msg, res);
                }
            }
        })

    })
});


router.post('/upload_image', function (req, res, next) {
    new multiparty.Form().parse(req, function (err, fields, files) {
        //console.log(fields);
        if (files.upload_image == undefined || files.upload_image == 'undefined') {
            var msg = 'some error occured';
            sendResponse.sendErrorMessage(msg, res);
        } else {
            var file = files.upload_image;
            //console.log(file);

            if (file != "") {
                //console.log(files.upload_image);
                var file_path = files.upload_image[0].path;
                var original_file_name = files.upload_image[0].originalFilename;
                var file_size = files.upload_image[0].size;
                var rand_str = randomstring.generate(7);
                var file_name = rand_str + '_' + original_file_name;

                var loginTime = new Date();
                var file_id = func.encrypt(loginTime + loginTime);
                uploader.upload({
                    fileId: file_id,
                    bucket: bucket_name,
                    source: file_path,
                    name: file_name
                },
                    function (data) { // success
                        console.log('upload success:', data);
                        profile_image_path = s3_path + data.path;
                        var profile_image_id = s3_path + data.id;

                        console.log('profile_image_path');
                        console.log(profile_image_path);
                        console.log(profile_image_id);

                        var final_path = profile_image_path;
                        if (err) {
                            console.log(err)
                            var errorMsg = 'some error occurred';
                            sendResponse.sendErrorMessage(errorMsg, res);
                        } else {
                            sendResponse.sendSuccessData(final_path, res);
                        }
                    },
                    function (errMsg) { //error
                        console.error('unable to upload: ' + errMsg);
                        sendResponse.sendSuccessData(errMsg, res);
                    });
            } else {
                var errorMsgg = 'Something went wrong';
                sendResponse.sendErrorMessage(errorMsgg, res);
            }
        }
    });

});


router.post('/edit_profile', function (req, res, next) {
    var user_id = req.body.user_id;
    var store_id = req.body.store_id;
    var store_name = req.body.store_name;
    var store_owner_name = req.body.store_owner_name;
    var product_type = req.body.product_type;
    var id = req.body.id;
    var sub_district = req.body.sub_district;
    var district = req.body.district;
    var owner_phone_number = req.body.owner_phone_number;
    var store_phone_number = req.body.store_phone_number;
    var line_id = req.body.line_id;
    var email = req.body.email;
    var facebook_url = req.body.facebook_url;
    var instagram_id = req.body.instagram_id;
    var website = req.body.website;
    var store_description = req.body.store_description;
    var store_link = req.body.store_link;
    var store_logo = req.body.store_logo;
    var delimiter = '##';
    var images_id = req.body.image_id;
    var image_id = images_id.split(delimiter);
    var update_images = req.body.store_images;
    var update_image = update_images.split(delimiter);
    var manValues = [user_id, store_id];
    var k = 0, l = 0, z = 0;
    var j = 0;
    var date = new Date();
    if (image_id[0].length > 0 && update_image[0].length) {
        z++;
    }
    console.log(z);
    async.waterfall([
        function (callback) {
            func.checkBlank(res, manValues, callback);
        }
    ], function () {

        var sql = 'update users set owner_phone_number = ? where user_id = ?';
        var values = [owner_phone_number, user_id];
        connection.query(sql, values, function (err1, res1) {
            if (err1) {
                var msg = 'some error occured0';
                sendResponse.sendErrorMessage(msg, res);
            } else {
                var sql1 = 'update store set store_name=?, store_owner_name=?, product_type=?, id=?, sub_district=?, store_logo=?, district=?, store_phone_number=?, line_id=?, facebook_url=?, instagram_id=?, website=?, store_description=?, store_link=? where store_id=?';
                var values1 = [store_name, store_owner_name, product_type, id, sub_district, store_logo, district, store_phone_number, line_id, facebook_url, instagram_id, website, store_description, store_link, store_id];
                console.log('query: ' + sql1);
                console.log(values1);
                connection.query(sql1, values1, function (err2, res2) {
                    if (err2) {
                        var msg = 'some error occured1';
                        sendResponse.sendErrorMessage(err2, res);
                    } else {
                        if (image_id[0].length > 0) {
                            console.log('1st Part');
                            for (var i = 0; i < image_id.length; i++) {
                                var sql2 = 'update images set image = ? where image_id = ?'
                                var values2 = [update_image[i], image_id[i]];
                                console.log(values2);
                                connection.query(sql2, values2, function (err3, res3) {
                                    i = k;
                                    if (err3) {
                                        if (i == image_id.length - 1) {
                                            var msg = 'some error occured';
                                            sendResponse.sendErrorMessage(msg, res);
                                        }
                                    } else {
                                        if (i == image_id.length - 1) {
                                            var msg = 'data updated successfully';
                                            sendResponse.sendSuccessData(msg, res);
                                        }
                                    }
                                    k++;
                                })
                            }
                        }
                    }
                })
            }
        })
    })
})


router.post('/get_store_details', function (req, res, next) {
    var access_token = req.body.access_token;
    var store_id = req.body.store_id;
    var manValues = [access_token,store_id];
    var manValues1 = [store_id]
    async.waterfall([
        function (callback) {
            if (access_token == '' || access_token == null) {
                func.checkBlank(res, manValues1, callback);
            } else {
                checkUser(res, access_token, callback);
            }
        }
    ], function () {
        var sql = ' select * from store where store_id = ?';
        var values = [store_id];
        connection.query(sql, values, function (err1, res1) {
            if (err1) {
                var msg = 'some error occured0';
                sendResponse.sendErrorMessage(msg, res);
            } else {
                if(res1.length>0){
                var sql2 = 'select * from users where user_id = ?';
                var values2 = [res1[0].user_id];
                connection.query(sql2, values2, function (err3, res3) {
                    if (err3) {
                        var msg = 'some error occured';
                        sendResponse.sendErrorMessage(msg, res);
                    } else {
                        var sql1 = 'select image_id,image from images where store_id = ?';
                        var values1 = [store_id];
                        connection.query(sql1, values1, function (err2, res2) {
                            if (err2) {
                                var msg = 'some error occured0';
                                sendResponse.sendErrorMessage(msg, res);
                            } else {
                                var data = { owner_details: res3, store_details: res1, images: res2 };
                                sendResponse.sendSuccessData(data, res);
                            }
                        })
                    }
                })
            }else{
                console.log(res1);
                var msg = 'enter valid store id';
                sendResponse.sendErrorMessage(msg,res);
            }
            }
        })
    })
})


router.post('/delete_image', function (req, res, next) {
    var image_id = req.body.image_id;
    var image_name1 = '';
    async.waterfall([
        function (callback) {
            checkImageId(res, image_id, callback);
        }
    ],
        function () {
            var sql1 = 'select * from images where image_id = ?';
            var values1 = [image_id];
            connection.query(sql1, values1, function (err2, res2) {
                if (err2) {
                    var msg = 'some error occured0';
                    sendResponse.sendErrorMessage(err2, res);
                } else {
                    var image = res2[0].image;
                    console.log(image)
                    if(image == '' || image == null || image == 'null'){
                        var msg = 'No image to delete';
                        sendResponse.sendSuccessData(msg,res);
                    }else{
                    var image_name = image.substr(image.indexOf("/") + 30);
                    var sql = 'update images set image = ? where image_id = ?';
                    var values = [image_name1, image_id];
                    connection.query(sql, values, function (err1, res1) {
                        if (err1) {
                            var msg = 'some error occured0';
                            sendResponse.sendErrorMessage(msg, res);
                        } else {
                            uploader.delete(bucket_name, [image_name], function (data) {
                                var msg = 'Image deleted';
                                sendResponse.sendSuccessData(msg, res);
                            }, function (err) {
                                var msg = 'Image deleted from database but not from AWS';
                                sendResponse.sendSuccessData(msg, res);
                            });
                        }
                    })
                }
                }
            })
        })
})


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


function checkUser(res, access_token, callback) {
    var sql = "SELECT * FROM users WHERE `access_token`=? limit 1";
    var values = [access_token];
    connection.query(sql, values, function (err, userResponse) {
        if (userResponse.length == '0' || userResponse.length == 0) {
            var errorMsg = 'Invalid Attempt';
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
            // if(userResponse.type == 0){
                callback();
            // }else{
            //     var errorMsg = 'Invalid Attempt';
            //     sendResponse.sendErrorMessage(errorMsg, res);
            // }
            
        }
    });
}


function checkImageId(res, image_id, callback) {
    var sql = "SELECT * FROM images WHERE `image_id`=? limit 1";
    var values = [image_id];
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