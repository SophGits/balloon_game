describe("Backbone Model tests", function(){

  var container;
  beforeEach(function() {
    container = document.createElement('div');
    app.balloonsView = new app.BalloonsView({el: container});
  });

  it("clicking the container adds a new div with class balloon", function(){
    expect($('.balloon', container).length).toEqual(0);
    $(container).click();
    expect($('.balloon', container).length).toEqual(1);
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