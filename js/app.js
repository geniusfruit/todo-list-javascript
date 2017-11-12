window.onload = function() {
  var model = new Model([],[],[]);
  var controller = new Controller();
  var view = new View(model,controller);
  controller.init(model,view);
}
