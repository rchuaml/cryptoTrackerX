


module.exports = (app, db) => {
  const crypto = require('./controllers/crypto')(db);
  app.post('/user/login', crypto.login);
  app.post('/user/signup',crypto.signup);
  app.get('/coin/data', crypto.coindata);
  app.post('/coin/add', crypto.coinadd);
};