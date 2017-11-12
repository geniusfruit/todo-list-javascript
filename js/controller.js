function Controller(){}

Controller.prototype.init = function(model,view){
  this.model = model;
  this.view = view;
};

Controller.prototype.save = function(task){
  if(task){
    this.model.todos.push(task);
    this.view.show(this.model.todos);
  }
};
Controller.prototype.remove = function(id){
  var todos = this.model.todos;
  todos.splice(id, 1);
  this.view.show(this.model.todos);
};
Controller.prototype.saveFilterType = function(filterType){
  this.model.filterType=filterType;
  var todos = this.model.todos;
  if(this.model.filter[1] === filterType){
  todos = this.model.todosInProgress;
  } else if(this.model.filter[2] === filterType){
  todos = this.model.todosCompleted;
  }
  if(todos){
    this.view.show(todos);
  }
};
