

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
    var balloonPosition = this.model.collection.indexOf(this.model);
    console.log(balloonPosition);
    var weight = new app.Weight({balloon: this.model, position: balloonPosition});
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



app.WeightView = Backbone.View.extend({
  className: "weight",
  render: function(){
    this.$el.html('<span>w</span>');
    return this;
  },
  initialize: function(){
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  }
});

app.WeightsView = Backbone.View.extend({
  initialize: function(){
    app.weights.on('add', this.addOne, this);
  },
  addOne: function(weight){
    var position = weight.attributes.position;
    var weightView = new app.WeightView({model: weight});
    var carrier = $('.balloon')[position];
    if(($('.weight'), carrier).length >= 3){
      // debugger
      console.log("more than 3");
      console.log(carrier); //always logs the right index
      return;
    } else {
      console.log("less than 3 weights"); // only logs until one is full up; then never again
       console.log(carrier);
      return $(carrier).append(weightView.render().el);
    }
  }
});

