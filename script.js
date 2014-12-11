var app = {};

//__________ Models ______________________________________________

app.Balloon = Backbone.RelationalModel.extend({
  relations: [{
    type: Backbone.HasMany,
    key: 'weights',
    relatedModel: 'app.Weight',
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
  // relations: [{
  //   type: Backbone.HasOne,
  //   key: 'balloon',
  //   relatedModel: 'Balloon'
  // }],
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
  el: '.container',
  initialize: function(){
    app.balloons.on('add', this.addOne, this);
    //app.balloons.fetch(); // get from localstorage
    // console.log('initialise collection view:' );
    // console.log(this);
  },
  events: {
    'click'   : 'addOne'
  },
  addOne: function(balloon){
    //console.log(this); // this is '.hi'
    //console.log(balloon); // mouse event (the click)
    var newballoon = new app.Balloon({name: 'Bob'});
    var balloonView = new app.BalloonView({model: newballoon});
    this.$el.append(balloonView.render().el);
    // this.$('div').append(balloonView.render().el);
    //console.log('balloonView: (from collection)');
    //console.log(balloonView); // new balloon view
  }
});

$(function() {
  app.balloonsView = new app.BalloonsView();
});