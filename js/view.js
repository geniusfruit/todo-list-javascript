function View(model, controller){
  this.controller = controller;
  this.model = model;
  this.task = document.getElementById("task");
  this.total = document.getElementById('total');
  this.todosEl = document.getElementById('todos');
  var self = this;
  var add = document.getElementById("add");
  var pipeline = document.getElementById("pipeline");
  var completed = document.getElementById("completed");
    add.onclick = function(){
      self.addTask();
    }
    pipeline.onclick = function(){
      self.showPipeline(self.model.filter[0]);
    }
    completed.onclick = function(){
      self.showCompleted(self.model.filter[2]);
    }
    window.addEventListener("keydown", function (e) {
      if ((e.keyCode || e.which) == 13) { // 13 is the keycode for "enter"
        add.click();
      }
    });
}
View.prototype.show = function(todos){
  var html = '';
  for(var i=0; i<todos.length; i++) {
      html += '<div class="list-item">' + todos[i] + '<button class="done" id="' + i  + '">Done</button>'+ '<button class="remove" id="' + i  + '">Remove</button></div>';
  };
  this.todosEl.innerHTML = html;
  var _this = this;
  var buttons = document.getElementsByClassName('remove');
  for (var i=0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function(e){
        var id = this.getAttribute('id');
        _this.remove(id);
      });
  };
  this.total.innerHTML = todos.length +" items left";
  this.clearInput();
};
View.prototype.clearInput= function () {
    this.task.value = "";
};
View.prototype.remove= function (id) {
  this.controller.remove(id);
  //localStorage.setItem('todo', JSON.stringify(todos));
};
View.prototype.addTask = function(){
  var task = this.task.value;
  this.controller.save(task);
};
View.prototype.activeType = function(type){
  var type = document.getElementById(type);
  type.className += " selected";
};
View.prototype.showPipeline = function(filter){
  this.activeType(filter);
  this.controller.saveFilterType(filter);
};
View.prototype.showCompleted = function(filter){
    this.activeType(filter);
  this.controller.saveFilterType(filter);
};
Object.defineProperty(View.prototype, "message",{
  set: function(message){
    var todos = document.getElementById("todos");
    todos.innerHTML = message;
  },
  enumerable:true,
  configurable:true
});
