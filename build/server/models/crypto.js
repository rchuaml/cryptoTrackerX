const cookieParser = require('cookie-parser');
var sha256 = require('js-sha256');


/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (db) => {

    let getAll = (response, callback) => {
        let query = 'SELECT * FROM users';
        db.query(query, (error, result) => {
            response.json(result.rows);
        });
    };

    let getUserLoginInfo = (user_name, callback) => {
        const queryString = "SELECT username, password,id FROM users WHERE username ='" + user_name + "'";
        db.query(queryString, (err, queryResult) => {
            console.log("inside user login info", queryResult);
            result = queryResult;
            callback(err, result);
        });
    };

    let addUser = (response, details, callback) => {
        let queryString = `SELECT username FROM users WHERE username = '${details.username}'`;
        db.query(queryString, (err, queryResult) => {

            if (queryResult.rows.length === 0) {
                let hashedpassword = sha256(details.password+'SALT');
                let newquery = `INSERT into users(username,password)VALUES('${details.username}','${hashedpassword}')`;
                db.query(newquery, (err, queryResult) => {})
                response.json('2');
            } else {
                response.json('1');
            }
        });

    };

    let getProfile = (request, response, callback) => {
        let userId = request.cookies.userId;
        let queryString = `SELECT * FROM book WHERE owner_id = '${userId}' ORDER BY id`;
        db.query(queryString, (err, queryResult) => {
            console.log(queryResult.rows);
            response.render('library', { list: queryResult.rows });
        });
    };

    let editProfile = (request, response, parsedObject, percentage, callback) =>{
        // let queryString = `INSERT into book WHERE id = `
        console.log("inside edit profile", parsedObject.id);
        let queryString = `UPDATE book SET progress = ${percentage} WHERE id = ${parsedObject.id}`;
        db.query(queryString,(err,queryResult)=>{
            response.redirect('/user/profile');
        });
    };

    let deleteProfile = (response, parsedInfo, callback) => {
        let queryString = `DELETE from book WHERE id = ${parsedInfo.id}`;
        db.query(queryString,(err,queryResult)=>{
            response.redirect('/user/profile');
        });
    };

    let addCoin = (response, request, details, callback) => {
        console.log(details);
        console.log(request.cookies.userName);
        let queryName = `SELECT id from users WHERE username = '${request.cookies.userName}'`;
        db.query(queryName,(err,queryResult)=>{
            let idn = queryResult.rows[0].id;
            let queryString = `INSERT INTO coins (owner_id,name,symbol,buyprice,logo,cmcid)VALUES(${idn},'${details.name}','${details.symbol}',${details.quote.USD.price},${details.id},${details.id})`;
            db.query(queryString,(err,queryResult)=>{
                response.json("success");
            });
        });
    }

    let trackCoin = (response, request, details, callback) => {
        let queryName = `SELECT id from users WHERE username = '${request.cookies.userName}'`;
        db.query(queryName,(err,queryResult)=>{
            let idn = queryResult.rows[0].id;
            let queryString = `SELECT * FROM coins WHERE owner_id = ${idn} ORDER BY id DESC`;
            db.query(queryString,(err,queryResult2)=>{
                response.json(queryResult2.rows);
            });
        });
    }
    let coinEdit = (response, request, details, callback) => {
            console.log(details);
            let queryString = `UPDATE coins SET qty = ${parseFloat(details.quantity)}, buyprice = ${parseFloat(details.price)} WHERE id = ${details.id}`;
            db.query(queryString, (err, queryResult2)=>{
                if(err){
                    response.json(err);
                }else{
                    response.json("successsfully edited");
                }
        });
    }

    let coinDelete = (response, request, details, callback) => {
        let queryString = `DELETE from coins WHERE id = ${details}`;
        db.query(queryString, (err, queryResult2)=>{
            if(err){
                response.json(err);
            } else {
                response.json("Successfully deleted");
            }
        });
    }


    return {
        getUserLoginInfo,
        addUser,
        addCoin,
        trackCoin,
        coinEdit,
        coinDelete,
        getAll
    };
};