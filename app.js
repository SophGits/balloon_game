$(function() {
  Backbone.history.start();
  app.balloonsView = new app.BalloonsView({el: '.container'});
});