


module.exports = (app, db) => {
  const crypto = require('./controllers/crypto')(db);
  //Users Routes
  app.get('/user/all', crypto.getall);
  app.post('/user/login', crypto.login);
  app.post('/user/signup',crypto.signup);

  //Coins Routes
  app.get('/coin/data', crypto.coindata);
  app.get('/coin/track', crypto.cointrack);
  app.post('/coin/add', crypto.coinadd);
  app.post('/coin/calculate', crypto.coinCalc);
  app.post('/coin/news', crypto.coinNews);
  app.put('/coin/edit', crypto.coinedit);
  app.delete('/coin/delete', crypto.coinDelete);

};