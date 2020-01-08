<<<<<<< Updated upstream
module.exports = function (app) {
  app.use('/', require('../routes/indexrouter'));
  app.use('/search', require('../routes/searchrouter'));
  app.use('/detail', require('../routes/detailrouter'));
  app.use('/account', require('../routes/accountrouter'));
  app.use('/admin', require('../routes/adminrouter'));
  app.use('/admin/category', require('../routes/admin.category.router'));
  app.use('/admin/product', require('../routes/admin.product.router'));
  app.use('/admin/user', require('../routes/admin.user.router'));
=======
module.exports = function (app) {
  app.use('/', require('../routes/indexrouter'));
  app.use('/search', require('../routes/searchrouter'));
  app.use('/detail', require('../routes/detailrouter'));
  app.use('/account', require('../routes/accountrouter'));
  app.use('/admin', require('../routes/adminrouter'));
  app.use('/admin/category', require('../routes/admin.category.router'));
  app.use('/admin/product', require('../routes/admin.product.router'));
  app.use('/admin/user', require('../routes/admin.user.router'));
>>>>>>> Stashed changes
};