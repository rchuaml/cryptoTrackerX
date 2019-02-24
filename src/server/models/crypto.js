const cookieParser = require('cookie-parser');
var sha256 = require('js-sha256');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (db) => {

    let getAll = (callback) => {
        let query = 'SELECT * FROM users';

        db.query(query, (error, result) => {
            callback(error, result);
            console.log(result);
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

    let addBook = (response, username, inspected, callback) => {

        let queryString = `SELECT id FROM users WHERE username ='${username}'`;
        db.query(queryString, (err, queryResult) => {
            let id = queryResult.rows[0].id;
            let newString = `INSERT INTO book (owner_id,title,description,thumbnail) VALUES (${id},'${inspected.title}', '${inspected.description}', '${inspected.thumbnail}')`;
            db.query(newString, (err, queryResult) => {
                response.redirect('/book');
            });
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


    return {
        getUserLoginInfo,
        addUser
    };
};