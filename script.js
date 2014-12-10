var app = {};

//__________ Models ______________________________________________

app.Balloon = Backbone.RelationalModel.extend({
  relations: [{
    type: Backbone.HasMany,
    key: 'weights',
    relatedModel: 'Weight',
    reverseRelation: {
      key: 'balloon',
      // type: Backbone.HasOne,
      includeInJSON: 'id'
    }
  }],
  defaults: {
    type: "balloon"
  }
});

app.Weight = Backbone.RelationalModel.extend({
  urlRoot: '/weight/',
  defaults: {
    type: "weight"
  },
  create: function(relatedBalloon){
    this.balloon = relatedBalloon;
    this.save();
  }
});

//_______Collections ____________________________________________
app.Balloons = Backbone.Collection.extend({
  model: app.Balloon,
  url: '#',
  localStorage: new Store("balloonclick"),
  save: function(){
    this.save();
  }
});
app.balloons = new app.Balloons();

app.Weights = Backbone.Collection.extend({
  model: app.Weight,
  url: '#',
  save: function(){
    this.save();
  }
});
app.weights = new app.Weights();

//_________Views_________________________________________________
app.BalloonView = Backbone.View.extend({
  className: "balloon",
  events: {
    'click .yo'   : 'render'
  },
  initialize: function(){
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },
  render: function(){
    console.log("render balloon");
    // this.$el.html('<p>hi</p>');
    // return this;
  }
});

app.BalloonsView = Backbone.View.extend({
  el: '.hi',
  initialize: function(){
    app.balloons.on('add', this.addOne, this);
    app.balloons.fetch(); // get from localstorage
    console.log('initialise:' );
    console.log(this);
  },
  events: {
    'click .hi'   : 'addOne'
  },
  addOne: function(balloon){
    console.log(this);
    console.log(balloon);
    // var view = new app.BalloonView({model: balloon});
    // console.log(balloon);
    // $('#yo').append(view.render());
  }
});

app.balloonsView = new app.BalloonsView();