var con = require('../../../config/database');

var API = {

    /**
     * Function to get api users list
     * 04-06-2021
     * @param {Function} callback 
     */
    apiCompanyList: function (callback) {
        con.query("SELECT u.*, COALESCE(ut.device_token, '') AS device_token, COALESCE(ut.device_type, '') AS device_type, COALESCE(ut.token, '') AS token FROM tbl_company u LEFT JOIN tbl_user_device ut ON u.id = ut.user_id WHERE ut.user_type = 'company'", function (err, result, fields) {
            if (!err) {
                callback(result?.rows);
            } else {
                callback(null, err);
            }
        });
    },

    apiClientList: function (callback) {
        con.query("SELECT u.*, COALESCE(ut.device_token, '') AS device_token, COALESCE(ut.device_type, '') AS device_type, COALESCE(ut.token, '') AS token FROM tbl_client u LEFT JOIN tbl_user_device ut ON u.id = ut.user_id WHERE ut.user_type = 'client'", function (err, result, fields) {
            if (!err) {
                callback(result?.rows);
            } else {
                callback(null, err);
            }
        });
    },
    
    apiEmployeeList: function (callback) {
        con.query("SELECT u.*, COALESCE(ut.device_token, '') AS device_token, COALESCE(ut.device_type, '') AS device_type, COALESCE(ut.token, '') AS token FROM tbl_employee u LEFT JOIN tbl_user_device ut ON u.id = ut.user_id WHERE ut.user_type = 'employee'", function (err, result, fields) {
            if (!err) {
                callback(result?.rows);
            } else {
                callback(null, err);
            }
        });
    },
}

module.exports = API;