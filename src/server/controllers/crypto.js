const request = require('request');
var sha256 = require('js-sha256');
var cookieParser = require('cookie-parser');


module.exports = (db) => {


     let login = (req, res) => {
        var user_name = req.body.username;
        db.crypto.getUserLoginInfo(user_name, (error, result) => {
            console.log("inside result", result);
            if (result.rows.length === 0) {
                res.json("1");
            } else if (result.rows.length > 0) {
                if (error) {
                    console.log('query err', error.message);
                } else {
                    let hashedPassword = result.rows[0].password;
                    console.log(hashedPassword);
                    let hashedInputPassword = sha256(req.body.password + 'SALT');
                    console.log(hashedInputPassword);
                    if (hashedPassword === hashedInputPassword) {
                        res.json("3");
                    } else {
                        res.json("2");
                    }
                }
            }
        });
    }

        let loginCheck = (request, response) => {
        let user_name = request.body.username;
        db.book.getUserLoginInfo(user_name, (error, result) => {
            console.log("inside result", result);
            if (result.rows.length === 0) {
                response.render('loginform', { list: ['error'] });
            } else if (result.rows.length > 0) {
                if (error) {
                    console.log('query err', error.message);
                } else {
                    let hashedPassword = result.rows[0].password;
                    let hashedInputPassword = sha256(request.body.password + 'SALT');
                    console.log("this is the hashed input password", hashedInputPassword);
                    let hashedName = sha256(user_name + 'SALT');
                    if (hashedPassword === hashedInputPassword) {
                        response.cookie('loggedin', 'true');
                        response.cookie('username', user_name);
                        response.cookie('userId', result.rows[0].id);
                        response.redirect('/book')
                    } else {
                        response.render('loginform', { list: ['error'] });

                    }
                }
            }
        });

    };




  return {
    login:login
  };
};