var sendResponse = require('./sendresponse');


exports.checkBlank = function (res, manValues, callback) {
    var checkBlankData = checkBlank(manValues);

    if (checkBlankData) {
        sendResponse.parameterMissingError(res);
    }
    else {
        callback(null);
    }
}

function checkBlank(arr) {

    var arrlength = arr.length;

    for (var i = 0; i < arrlength; i++) {
        if (arr[i] == '') {
            return 1;
            break;
        }
        else if (arr[i] == undefined) {
            return 1;
            break;
        }
        else if (arr[i] == '(null)') {
            return 1;
            break;
        }
    }
    return 0;
}

/*
 * ------------------------------------------------------
 *  check App Version
 *  INPUT : appVersion
 *  OUTPUT : update popup and critical
 * ------------------------------------------------------
 */

exports.checkAppVersion = function (res,deviceType, appVersion, callback) {

    var sql = "SELECT `id`, `type`, `version`, `critical`,`last_critical_version` FROM `app_version` WHERE `type`=? limit 1";
    var values = [deviceType];
    dbConnection.Query(res, sql, values, function (appVersionResponse) {

        console.log(appVersionResponse);

        appVersion = parseInt(appVersion);

        if(appVersionResponse[0].last_critical_version > appVersion)
        {
            callback(null, 1, 1);
        }
        else if (appVersionResponse[0].version > appVersion) {
            callback(null, 1, appVersionResponse[0].critical);
        }
        else {
            callback(null, 0, 0);
        }
    });
};

/*
 * -----------------------------------------------------------------------------
 * Encryption code
 * INPUT : string
 * OUTPUT : crypted string
 * -----------------------------------------------------------------------------
 */
exports.encrypt = function (text) {

    var crypto = require('crypto');
    var cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq');
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}


/*
 * ------------------------------------------------------
 * Authenticate a user through Access token and return extra data
 * Input:Access token{Optional Extra data}
 * Output: User_id Or Json error{Optional Extra data}
 * ------------------------------------------------------
 */
exports.authenticateAccessTokenAndReturnExtraData = function (accesstoken, arr, res, callback) {

    var sql = "SELECT `user_id`";
    arr.forEach(function (entry) {
        sql += "," + entry;
    });
    sql += " FROM `users`";
    sql += " WHERE `access_token`=? LIMIT 1";
    var values = [accesstoken];
    dbConnection.Query(res, sql, values, function (result) {

        if (result.length > 0) {

            return callback(null, result);

        } else {
            sendResponse.invalidAccessTokenError(res);
        }
    });

}


/*
 * --------------------------------------------------------------------------
 * to check email already exists or not
 * ---------------------------------------------------------------------------
 */
function check_email_availability(res, email, callback) {
    var sql = "SELECT `email` FROM `user` WHERE `email`=? limit 1";
    var values = [email];
    connection.query(sql, values, function (err, userResponse) {
        if (userResponse.length) {
            var errorMsg = 'You are already registered with us, Please login to enjoy the services';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else
        {
            callback();
        }
    });
}

/*
 * --------------------------------------------------------------------------
 * to check user already exists or not
 * ---------------------------------------------------------------------------
 */
function user_registered_check(res, email, callback) {
    var sql = "SELECT * FROM `user` WHERE `email`=? limit 1";
    var values = [email];
    connection.query(sql, values, function (err, userResponse) {
        if (userResponse.length) {
            callback();
        } else
        {
            var errorMsg = 'User is not registered with us.Please register first to enjoy the services';
            sendResponse.sendErrorMessage(errorMsg, res);
        }
    });
}

/*
 * ----------------------------------------------------------------------------------------------------------------------------------------
 * check User Is Valid or Not
 * INPUT : access_token
 * ----------------------------------------------------------------------------------------------------------------------------------------
 */
exports.checkUser = function(res, access_token, callback) {
    var sql = "SELECT * FROM `users` WHERE `access_token`=? limit 1";
    var values = [access_token];
    connection.query(sql, values, function (err, userResponse) {
        if (userResponse.length == '0' || userResponse.length == 0) {
            var errorMsg = 'Invalid Attempt';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else
        {
            callback();
        }
    });
}


/*
 * ----------------------------------------------------------------------------------------------------------------------------------------
 * check id Is Valid or Not
 * INPUT : id
 * ----------------------------------------------------------------------------------------------------------------------------------------
 */
exports.checkId = function(res, id, status, callback) {
    if(status == 0 || status == '0'){
        var sql = "SELECT * FROM `store` WHERE `store_id`=? limit 1";
    }else if(status == 1 || status == '1'){
        var sql = "SELECT * FROM `users` WHERE `user_id`=? limit 1";
    }else{
        var msg = 'enter valid status';
    }
    var values = [id];
    connection.query(sql, values, function (err, userResponse) {
        if (userResponse.length == '0' || userResponse.length == 0) {
            var errorMsg = 'Invalid Attempt';
            sendResponse.sendErrorMessage(errorMsg, res);
        } else
        {
            callback();
        }
    });
}