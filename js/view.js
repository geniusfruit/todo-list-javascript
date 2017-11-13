function View(model, controller){
  this.controller = controller;
  this.model = model;
  this.task = document.getElementById("task");
  this.total = document.getElementById('total');
  this.todosEl = document.getElementById('todos');
  this.addBtn = document.getElementById('add');
  var self = this;
  var activeTask = document.getElementById("activeTask");
  var completed = document.getElementById("completed");
  this.show();
    this.addBtn.onclick = function(){
      self.addTask();
    }
    // Add a "checked" symbol when clicking on a list item
    var list = document.querySelector('ul');
    list.addEventListener('click', function(ev) {
      if (ev.target.tagName === 'LI') {
        var isCompleted = true;
        if(ev.target.classList.contains("checked")){
          isCompleted = false;
        }
        // ev.target.classList.toggle('checked');
        self.completed(ev.target.id,isCompleted);
      }
    }, false);
    window.addEventListener("keydown", function (e) {
      if ((e.keyCode || e.which) == 13) { // 13 is the keycode for "enter"
        add.click();
      }
    });
}
View.prototype.show = function(){
  var todos = this.model.getActiveTodos();
  this.todosEl.innerHTML = '';
  if(todos && todos.length>0){
    var html = '';
    this.todosEl.innerHTML = '';
    for(var i=0; i<todos.length; i++) {
      var li = document.createElement("li");
      var t = document.createTextNode(todos[i].task);
      li.id = i;
      if(todos[i].completed){
          li.className= "checked";
      }
      li.appendChild(t);
      this.todosEl.appendChild(li);
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.id = i;
      span.appendChild(txt);
      li.appendChild(span);
    };
    var _this = this;
    var removeBtns = document.getElementsByClassName('close');
    var completedBtns = document.getElementsByClassName('checkme');
    for (var i=0; i < removeBtns.length; i++) {
        removeBtns[i].addEventListener('click', function(e){
          var id = e.target.id;
         _this.remove(id);
        });
    };
  //  this.total.innerHTML = todos.length +" items left";
    this.clearInput();
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
};

View.prototype.showActiveTask = function(filter){
  this.controller.saveFilterType(filter);
};
View.prototype.showCompleted = function(filter){
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
