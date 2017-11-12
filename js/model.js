function Model(todos, todosInProgress, todosCompleted){
  this.filter = ["pipeline","inprogress","completed"];
  this.filterType = "pipeline";
  this.todos = todos;
  this.todosInProgress = todosInProgress;
  this.todosCompleted = todosCompleted;
}
