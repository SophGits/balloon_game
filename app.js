$(function() {
  Backbone.history.start();
  app.balloonsView = new app.BalloonsView({el: '.container'});
  app.weightsView = new app.WeightsView({el: '.container'});
  //app.balloons.fetch(); // get from localstorage

  var createTarget = function(){
    var target = '<div class=target></div>';
    $('.container').append(target);

    // var bottom = ($('.container').height()) * Math.random();
    var bottom = Math.floor( ( Math.random() * ( $('.container').height() - $(this).height() ) ) + 150);

    // var left = ($('.container').width()) * Math.random();
    var left = Math.floor(Math.random() * $('.container').width() - 50 );

    $('.target').css('bottom', bottom).css('left', left);
  }

  createTarget();
});