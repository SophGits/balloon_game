describe("Backbone Model tests", function(){

// see if you can mock backbone localstorage

  var container;
  beforeEach(function() {
    // wipe (test version of) localstorage before each test run
    container = document.createElement('div');
    app.balloonsView = new app.BalloonsView({el: container});
  });

  it("clicking the container adds a new balloon", function(){
    expect($('.balloon', container).length).toEqual(0);
    $(container).click();
    expect($('.balloon', container).length).toEqual(1);
  });

  it("renders all the balloons in a collection", function(){
    expect($('.balloon', container).length).toEqual(0);
    app.balloons.create({name: 'Claudio'});
    app.balloons.create({name: 'Winna'});
    expect($('.balloon', container).length).toEqual(2);
  });


});

// describe("Backbone Collection tests", function(){
//   it("should create a new collection object", function(){
//     // var newSquare = new Backbone.Model({letter: "Animals"});
//     var newBoard = new Backbone.Collection({
//       // model: newSquare,
//       title: "New game board"
//     });
//     expect(newBoard.pluck("title")).toEqual(["New game board"]);
//   });
// });