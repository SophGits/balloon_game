

//_________Views_________________________________________________
app.BalloonView = Backbone.View.extend({
  className: "balloon",
  events: {
    'click div'   : 'render'
  },
  render: function(){
    //console.log("render inidivual balloon. (should return <div.balloon><p>hi</p></div>");
    this.$el.html('<p>hi</p>');
    return this;
  },
  initialize: function(){
    //console.log('initialise individual view: ');
    //console.log(this); // logs a new view fine, but then seems not to render
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  }
});

app.BalloonsView = Backbone.View.extend({
  initialize: function(){
    app.balloons.on('add', this.addOne, this);
  },
  events: {
    'click'   : 'createOne'
  },
  checkUnderThree: function(){
    console.log(app.balloonsView);
    // console.log(app.balloonView);
    // console.log(app.BalloonView);
    console.log(app.balloons);
    // console.log(app.Balloons);
  },
  createOne: function(e){
    app.balloons.create({name: 'Bob'});
  },
  addOne: function(balloon){
    this.checkUnderThree();
    //console.log(this); // this is '.hi'
    var balloonView = new app.BalloonView({model: balloon});
    this.$el.append(balloonView.render().el);
    // this.$('div').append(balloonView.render().el);
    //console.log('balloonView: (from collection)');
    //console.log(balloonView); // new balloon view
  },
  addMany: function(balloons){
    var self = this; // self is balloons view
    balloons.forEach(function(balloon){
      self.addOne(balloon);
    });
  }
});
