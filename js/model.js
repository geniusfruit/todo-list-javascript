function Model(){
  this.todos = this.getActiveTodos();
}
Model.prototype.getActiveTodos = function() {
    var todos = new Array;
    var todos_str = localStorage.getItem("todos");
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}
Model.prototype.setActiveTodos = function(task) {
    var todos = this.getActiveTodos();
    var taskObj = {};
    taskObj.task = task;
    taskObj.completed = false;
    todos.unshift(taskObj);
    localStorage.setItem("todos", JSON.stringify(todos));
}
Model.prototype.setCompletedTodos = function(id,isCompleted) {
    var activeTodos = this.getActiveTodos();
    var completedTask=activeTodos.splice(id, 1);
    completedTask[0].completed=isCompleted;
    activeTodos.push(completedTask[0]);
    localStorage.setItem("todos", JSON.stringify(activeTodos));
}
Model.prototype.removeTodo = function(id) {
    var todos = this.getActiveTodos();
    var storeKey = 0;
    todos.splice(id, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
