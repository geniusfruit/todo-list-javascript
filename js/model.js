function Model(){
  this.filter = ["activeTask","completed"];
  this.filterType = "activeTask";
}
Model.prototype.getActiveTodos = function() {
    var todos = new Array;
    var todos_str = localStorage.getItem("todos");
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}
Model.prototype.getCompletedTodos = function() {
    var todos = new Array;
    var todos_str = localStorage.getItem("todos_completed");
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}
Model.prototype.setActiveTodos = function(task) {
  var todos = this.getActiveTodos();
  todos.push(task);
  localStorage.setItem("todos", JSON.stringify(todos));
}
Model.prototype.setCompletedTodos = function(id) {
  var activeTodos = this.getActiveTodos();
  var completedTask=activeTodos.splice(id, 1);
  var completedTodos = this.getCompletedTodos();
  completedTodos.push(completedTask);
  localStorage.setItem("todos", JSON.stringify(activeTodos));
  localStorage.setItem("todos_completed", JSON.stringify(completedTodos));
}
Model.prototype.removeTodo = function(id) {

  if(this.filter[1] === this.filterType){
    storeKey = 1;
    todos = this.getCompletedTodos();
    todos.splice(id, 1);
    localStorage.setItem("todos_completed", JSON.stringify(todos));
  }
  else{
    var todos = this.getActiveTodos();
      var storeKey = 0;
      todos.splice(id, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
  }
}
