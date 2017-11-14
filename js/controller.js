function Controller(){}

Controller.prototype.init = function(model,view){
  this.model = model;
  this.view = view;
  this.view.show();
};

Controller.prototype.save = function(task){
  if(task){
    this.model.setActiveTodos(task);
    this.view.show();
  }
};
Controller.prototype.remove = function(id){
  this.model.removeTodo(id);
  this.view.show();
};
Controller.prototype.completed = function(id,isCompleted){
  this.model.setCompletedTodos(id,isCompleted);
  this.view.show();
};