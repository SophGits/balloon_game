

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
    this.model.on('remove:weights', this.float, this);
  },
  attachWeight: function(e){
    if(e.target.className !== "balloon"){
      return;
    } else {
      var balloonPosition = this.model.collection.indexOf(this.model);
      if($(('.weight'), this.$el).length < 3 ){
        var weight = new app.Weight({balloon: this.model, position: balloonPosition});
        app.weights.add(weight);
        this.float();
      } else {
        console.log("cannot attach another weight")
      }
    }
  },
  float: function(){
    // console.log("floating up");
    var that = this;
    var currentY = parseInt(that.$el.css('bottom'));

    var timer;
    var upordown;
    var go;

    if($(('.weight'), this.$el).length === 0 ){
      console.log("0 attached");
        clearInterval(this.go);
        upordown = function(){return currentY +=1}
        timer = 10;
    } else if($(('.weight'), this.$el).length === 1 ){
      console.log("1 attached");
        clearInterval(this.go);
        upordown = function(){return currentY +=1}
        timer = 30;
    } else if($(('.weight'), this.$el).length === 2 ){
      console.log("2 attached");
        clearInterval(this.go);
        upordown = function(){return currentY +=1}
        timer = 800;
    } else if($(('.weight'), this.$el).length === 3 ){
      console.log("3 attached");
        clearInterval(this.go);
        upordown = function(){return currentY -=1}
        timer = 40;
    } else {
      console.log("wtf");
    }
    this.go = setInterval(function(){go2();}, timer);
    var go2 = function(){
      if(currentY <= $('.container').height() && currentY >= 1){
          that.$el.css('bottom', currentY);
          return upordown();
      } else {
        return;
      }
    }
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
    if(app.balloons.length <=2 && e.target.className == 'container'){
      app.balloons.create({name: 'Bob', x: e.offsetX});
    } else {
      return;
    }
  },
  addOne: function(balloon){
    var balloonView = new app.BalloonView({model: balloon});
    this.$el.append(balloonView.render().el);
    balloonView.float();
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
  events: {
    'dblclick' :  'destroy',
    'span dblclick' :  'destroy'
  },
  destroy: function(){
    this.model.destroy();
  },
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
      return;
    } else {
      var weightView = new app.WeightView({model: weight});
      return $(carrier).append(weightView.render().el);
    }
  }
});

