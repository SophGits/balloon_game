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