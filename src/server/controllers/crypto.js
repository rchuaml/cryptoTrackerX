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

         let signup = (req, res) => {
            db.crypto.addUser(res, req.body, (error, result) => {
                console.log(result.rows);
            });
        }
         let coindata = (req,res) => {
            request("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=",function(error, queryResponse, body){
            res.json(body);
            });
         }




  return {
    login:login,
    signup:signup,
    coindata:coindata
  };
};