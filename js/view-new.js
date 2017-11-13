function View(model, controller){
  this.controller = controller;
  this.model = model;
  this.task = document.getElementById("task");
  this.total = document.getElementById('total');
  this.todosEl = document.getElementById('todos');
  this.addBtn = document.getElementById('add');
  this.show();
  var self = this;
  this.addBtn.addEventListener('click', function(ev) {
    self.addTask();
  }, false);

  // Add a "checked" symbol when clicking on a list item
  var list = document.querySelector('ul');
  list.addEventListener('click', function(ev) {
    ev.preventDefault();
    if (ev.target.tagName === 'LI') {
      var isCompleted = true;
      if(ev.target.classList.contains("checked")){
        isCompleted = false;
      }
      self.completed(ev.target.id,isCompleted);
      // ev.target.classList.toggle('checked');
    }
  }, false);
  window.addEventListener("keydown", function (e) {
    if ((e.keyCode || e.which) == 13) { // 13 is the keycode for "enter"
      add.click();
    }
  });
}
View.prototype.show = function(){
  var todos = this.model.todos;
  this.todosEl.innerHTML = '';
  this.total.innerHTML = "0 items left";
  var completedTaskLength = 0;
  var _this = this;
  if(todos && todos.length>0){
    for(var i=0; i<todos.length; i++) {
      var li = document.createElement("li");
      var t = document.createTextNode(todos[i].task);
      li.id = i;
      if(todos[i].completed){
          li.className= "checked";
          completedTaskLength++;
      }
      li.appendChild(t);
      this.todosEl.appendChild(li);
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.id = i;
      span.addEventListener('click', function(e){
        var id = e.target.id;
       _this.remove(id);
      });
      span.appendChild(txt);
      li.appendChild(span);
    };
    var totalText = (todos.length - completedTaskLength) +" items left";
    utils.setTextContent(this.total,totalText);
    //this.total.innerHTML = (todos.length - completedTaskLength) +" items left";
  }
};
View.prototype.clearInput= function () {
    this.task.value = "";
};
View.prototype.remove= function (id) {
  this.controller.remove(id);
};
View.prototype.completed= function (id,isCompleted) {
  this.controller.completed(id,isCompleted);
};
View.prototype.addTask = function(){
  var task = this.task.value;
  this.controller.save(task);
  this.clearInput();
};
Object.defineProperty(View.prototype, "message",{
  set: function(message){
    var msg = document.getElementById("msg");
    todos.innerHTML = message;
  },
  enumerable:true,
  configurable:true
});
