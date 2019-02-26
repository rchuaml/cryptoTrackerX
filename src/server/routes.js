


module.exports = (app, db) => {
  const crypto = require('./controllers/crypto')(db);
  app.post('/user/login', crypto.login);
  app.post('/user/signup',crypto.signup);
  app.get('/coin/data', crypto.coindata);
  app.post('/coin/add', crypto.coinadd);
  app.get('/coin/track', crypto.cointrack);
  app.put('/coin/edit', crypto.coinedit);
  app.delete('/coin/delete', crypto.coinDelete);
};