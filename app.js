$(function() {
  Backbone.history.start();
  app.balloonsView = new app.BalloonsView({el: '.container'});
  //app.balloons.fetch(); // get from localstorage
});