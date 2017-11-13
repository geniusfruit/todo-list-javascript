function View(model, controller){
  this.controller = controller;
  this.model = model;
  this.activeFilter();
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
    activeTask.onclick = function(){
      self.showActiveTask(self.model.filter[0]);
    }
    completed.onclick = function(){
      self.showCompleted(self.model.filter[1]);
    }
    window.addEventListener("keydown", function (e) {
      if ((e.keyCode || e.which) == 13) { // 13 is the keycode for "enter"
        add.click();
      }
    });
}
View.prototype.show = function(){
  var todos = this.model.getActiveTodos();
  var isActiveTodo = true;
  if(this.model.filter[1] === this.model.filterType){
  todos = this.model.getCompletedTodos();
  isActiveTodo = false;
  }
  this.todosEl.innerHTML = '';
  if(todos){
    var html = '';
    for(var i=0; i<todos.length; i++) {
        html += '<div class="list-item"><div class="'+((isActiveTodo)?"task-text":"task-text strikeText")+'">' + todos[i] +'</div><div class="btn-section">' ;
        if(isActiveTodo){
          html += '<button class="done" id="' + i  + '">Done</button>';
        }
        html += '<button class="remove" id="' + i  + '">Remove</button></div></div>';
    };
    this.todosEl.innerHTML = html;
    var _this = this;
    var removeBtns = document.getElementsByClassName('remove');
    var completedBtns = document.getElementsByClassName('done');
    for (var i=0; i < removeBtns.length; i++) {
        removeBtns[i].addEventListener('click', function(e){
          var id = this.getAttribute('id');
          _this.remove(id);
        });
        if(isActiveTodo){
        completedBtns[i].addEventListener('click', function(e){
          var id = this.getAttribute('id');
          _this.completed(id);
        });
      }
    };
    this.total.innerHTML = todos.length +" items left";
    this.clearInput();
  }
};
View.prototype.clearInput= function () {
    this.task.value = "";
};
View.prototype.remove= function (id) {
  this.controller.remove(id);
};
View.prototype.completed= function (id) {
  this.controller.completed(id);
};
View.prototype.addTask = function(){
  var task = this.task.value;
  this.controller.save(task);
};
View.prototype.activeFilter = function(type){
var selector = '.filter li .button';
var elems = document.querySelectorAll(selector);
var makeActive = function () {
    for (var i = 0; i < elems.length; i++)
        elems[i].classList.remove('selected');
    this.classList.add('selected');
};
for (var i = 0; i < elems.length; i++){
  elems[i].addEventListener('mousedown', makeActive);
}
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
