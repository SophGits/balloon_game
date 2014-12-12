$(function() {
  Backbone.history.start();
  app.balloonsView = new app.BalloonsView({el: '.container'});
  app.weightsView = new app.WeightsView({el: '.container'});
  //app.balloons.fetch(); // get from localstorage
});