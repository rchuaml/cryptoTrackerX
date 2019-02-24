module.exports = (app, db) => {
  const crypto = require('./controllers/crypto')(db);
  app.post('/user/login', crypto.login);
  app.post('/user/signup',crypto.signup);
};