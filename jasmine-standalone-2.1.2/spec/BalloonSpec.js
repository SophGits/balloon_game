describe("Backbone Model tests", function(){

  beforeEach(function() {
     var Balloon = new Backbone.RelationalModel({
        type: "balloon"
      });
   });

  it("should create a new relational model object with a 'balloon' class", function(){
    expect(Balloon.get("type")).toEqual("balloon");
  });
});

describe("Backbone Collection tests", function(){
  it("should create a new collection object", function(){
    // var newSquare = new Backbone.Model({letter: "Animals"});
    var newBoard = new Backbone.Collection({
      // model: newSquare,
      title: "New game board"
    });
    expect(newBoard.pluck("title")).toEqual(["New game board"]);
  });
});