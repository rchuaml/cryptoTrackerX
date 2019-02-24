module.exports = (app, db) => {
  const crypto = require('./controllers/crypto')(db);
  app.get('/query', crypto.get);
  app.post('/user/login', crypto.login)
};