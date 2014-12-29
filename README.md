### Balloon game using Backbone Relational


##### Notes
Line up 3 balloons in a target
(width apart?)
Click to release a balloon
Click the balloon to append a weight
1 weight slows it
2 weights stop it
Three weights sinks it
Four pops it (and a doubleclick adds two)
Drag off a weight to remove it
Clicking air blows it horizontally

One balloon has many weights




var weight = app.weights.at(0)

weight.getRelations()[0]
r {instance: r, reverseRelation: Object, options: Object, key: "balloon", keySource: "balloon"…}


var myIndex = this.model.collection.indexOf(this.model);
var nextModel = this.model.collection.at(myIndex+1);


offset() and position() both give current elemenet positions as far too high off the page
// var currentY = that.$el.position().top;

  // localStorage: new Backbone.LocalStorage("Balloons"),



        Using create like this:
              app.balloons.create({name: 'Bob', x: e.offsetX});
        Causes a problem when you destroy something

        Doing it like this:
        var weight = new app.Weight({balloon: this.model, position: balloonPosition});
        app.weights.add(weight);

        Might be better