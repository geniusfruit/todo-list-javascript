function Controller(){}

Controller.prototype.init = function(model,view){
  this.model = model;
  this.view = view;
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
Controller.prototype.completed = function(id){
  this.model.setCompletedTodos(id);
  this.view.show();
};
Controller.prototype.saveFilterType = function(filterType){
  this.model.filterType=filterType;
  this.view.show();
};
