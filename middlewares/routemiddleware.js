module.exports = function (app) {
  app.use('/', require('../routes/indexrouter'));
  app.use('/search', require('../routes/searchrouter'));
  app.use('/detail', require('../routes/detailrouter'));
  app.use('/account', require('../routes/accountrouter'));
};