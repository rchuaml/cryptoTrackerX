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
                        res.json(user_name);
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
            request("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=4de854e2-ca90-456e-85df-b00de91448c5",function(error, queryResponse, body){
            res.json(body);
            });
         }

         let coinadd = (req,res) => {
            db.crypto.addCoin(res,req,req.body,(error,result) => {
            });
         }

         let cointrack = (req,res) => {
            db.crypto.trackCoin(res,req,req.body,(error,result) => {
            });
         }

         let coinedit = (req,res) => {
            db.crypto.coinEdit(res,req,req.body,(error,result) => {
            });
         }

         let coinDelete = (req,res) => {
            db.crypto.coinDelete(res,req,req.body.id,(error,result) => {
            });
         }

         let coinCalc = (req,res) => {
            var array = []
            for(var i = 0; i < req.body.length; i ++){
            array.push(req.body[i].cmcid);
            }
            console.log(array);
            var queryString = array.join();
            console.log(queryString);
            request(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${queryString}&convert=USD&CMC_PRO_API_KEY=4de854e2-ca90-456e-85df-b00de91448c5`,function(error, queryResponse, body){
            // for(var j = 0; j < req.body.length; j ++){
            //     body.data[]
            // }
            var newArr = [];
                var data = JSON.parse(body);
            for(j = 0 ; j < req.body.length; j++){
                newArr.push(data.data[`${req.body[j].cmcid}`].quote.USD.price*req.body[j].qty);
            }
            console.log(newArr);
            res.json(newArr);
            });
         }

         let coinNews = (req,res) => {
            console.log(req.body.list.join());
            var coinBody = req.body.list;
            request(`https://min-api.cryptocompare.com/data/v2/news/?categories=${coinBody},regulation&extraParams=cryptoTrackerX?4985d39847e8399dcde1cf89296096ec22bcaa40a9fdda71a2df935591b2af4d`, function(error,queryResponse, body){
                var data = JSON.parse(body);
                res.json(data.Data);
            });
         }



  return {
    login:login,
    signup:signup,
    coindata:coindata,
    coinadd:coinadd,
    cointrack:cointrack,
    coinedit:coinedit,
    coinDelete:coinDelete,
    coinCalc:coinCalc,
    coinNews:coinNews
  };
};