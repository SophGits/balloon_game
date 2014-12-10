

//_________Views_________________________________________________
app.BalloonView = Backbone.View.extend({
  className: "balloon",
  events: {
    'click'   : 'attachWeight'
  },
  render: function(){
    this.$el.html('<p>hi</p>');
    this.$el.css('left', this.model.attributes.x);
    return this;
  },
  initialize: function(){
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },
  attachWeight: function(e){
    var balloonPosition = this.model.collection.indexOf(this.model);
    //console.log(balloonPosition);
   // console.log('this balloon: ');
   // console.log(this.model);
    //console.log(this.model.relations);

    // only add if less than 3 weights per balloon
    var weight = new app.Weight({balloon: this.model, position: balloonPosition});
    app.weights.add(weight);
  },
  rise: function(){
    console.log("floating up");
    var that = this;
    var currentY = parseInt(that.$el.css('bottom'));

    var then = function(){
      var newY = that.$el.css('bottom');
      console.log(newY);
    }

    setTimeout(function(){
      that.$el.css('bottom', currentY + 50);
      then();
    }, 1000);

  },
  fall: function(){
    console.log("falling down");
    var that = this;
    setTimeout(function(){
      that.$el.css('bottom', '0px')
    }, 1000);
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
      app.balloons.create({name: 'Bob', x: e.offsetX});
    } else {
      return;
    }
  },
  addOne: function(balloon){
    var balloonView = new app.BalloonView({model: balloon});
    this.$el.append(balloonView.render().el);
    balloonView.rise();
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
    var carrier = $('.balloon')[position];
    if($(('.weight'), carrier).length >= 3){
      //console.log(carrier); //always logs the right index
      return;
    } else {
      // console.log("less than 3 weights");
      var weightView = new app.WeightView({model: weight});
      return $(carrier).append(weightView.render().el);
    }
  }
});

