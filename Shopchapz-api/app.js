var mysql = require('mysql');

//====Localhost Database====//
var db_config = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: ''
};

connection = '';

function handleDisconnect() {
    console.log('in funct');
    connection = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function(err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
cors = require('cors');
app.use(cors());
constant = require('./routes/constant');
var super_admin = require('./routes/super-admin-panel/super_admin');
var store = require('./routes/store-panel/store');
var user = require('./routes/user-panel/users');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//email
nodemailer = require('nodemailer');
mailConfig = require('./routes/mailer');
transporter = nodemailer.createTransport(mailConfig);




//S3 

Uploader = require('s3-image-uploader');
multiparty = require('multiparty');


s3_path = "";
bucket_name = '';
bucket_key = '';
bucket_secret = '';

uploader = new Uploader({
    aws: {
        key: bucket_key,
        secret: bucket_secret
    },
    websockets: false
    //websocketServerPort : 3004,
});





// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//urls
forgot_password = 'http://www.shopchapz.com/admin/#/updatepassword';


// Super-Admin-Panel

app.post('/super_admin_login',super_admin);
app.post('/active_inactive_store',super_admin);
app.post('/all_users',super_admin);
app.post('/delete',super_admin);

// Store-Panel

app.post('/signup',store);
app.post('/admin_login',store);
app.post('/change_password',store);
app.post('/forgot_password',store);
app.post('/update_password',store);
app.post('/upload_image',store);
app.post('/edit_profile',store);
app.post('/get_store_details',store);
app.post('/delete_image',store);


// User-Panel

app.post('/list_of_all_stores',user);
app.post('/user_signup',user);
app.post('/update_profile',user);
app.post('/contact_us',user);
app.post('/user_login',user);
app.post('/ratings',user);
app.post('/comments',user);
app.post('/get_rating_and_comment',user);
app.post('/auth/facebook', user);
// app.post('/search',user);
app.post('/clicks',user);
app.post('/get_user_details',user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
