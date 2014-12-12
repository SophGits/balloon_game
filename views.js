

//_________Views_________________________________________________
app.BalloonView = Backbone.View.extend({
  className: "balloon",
  events: {
    'click'   : 'attachWeight'
  },
  render: function(){
    this.$el.html('<p>hi</p>');
    return this;
  },
  initialize: function(){
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },
  attachWeight: function(e){
    var weight = new app.Weight({ balloon: this.model });
    app.weights.add(weight);
  }
});

app.BalloonsView = Backbone.View.extend({
  initialize: function(){
    app.balloons.on('add', this.addOne, this);
  },
  events: {
    'click'   : 'createOne'
  },
  createOne: function(e){
    if(app.balloons.length <=2){
      app.balloons.create({name: 'Bob'});
    } else {
      return;
    }
  },
  addOne: function(balloon){
    var balloonView = new app.BalloonView({model: balloon});
    this.$el.append(balloonView.render().el);
    // this.$('div').append(balloonView.render().el);
  },
  addMany: function(balloons){
    var self = this; // self is balloons view
    balloons.forEach(function(balloon){
      self.addOne(balloon);
    });
  }
});
