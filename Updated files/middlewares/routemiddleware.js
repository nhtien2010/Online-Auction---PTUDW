module.exports = function (app) {
  app.use('/', require('../routes/indexrouter'));
  app.use('/search', require('../routes/searchrouter'));
};