function Model(){
  this.todos = getTodos();
  function getTodos(){
    var todos = this.todos || new Array;
    var todos_str = localStorage.getItem("todos");
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
  }
}
Model.prototype.setActiveTodos = function(task) {
    var todos = this.todos;
    var taskObj = {};
    taskObj.task = task;
    taskObj.completed = false;
    todos.unshift(taskObj);
    this.todos = todos;
    localStorage.setItem("todos", JSON.stringify(todos));
}
Model.prototype.setCompletedTodos = function(id,isCompleted) {
    var activeTodos = this.todos;
    var completedTask=activeTodos.splice(id, 1);
      completedTask[0].completed=isCompleted;
    if(isCompleted){
      activeTodos.push(completedTask[0]);
    } else {
      activeTodos.unshift(completedTask[0]);
    }
    this.todos = activeTodos;
    localStorage.setItem("todos", JSON.stringify(activeTodos));
}
Model.prototype.removeTodo = function(id) {
    var todos = this.todos;
    var storeKey = 0;
    todos.splice(id, 1);
    this.todos = todos;
    localStorage.setItem("todos", JSON.stringify(todos));
}
