var session = require('express-session');

module.exports = function (app) {
  app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true
  }));
}
