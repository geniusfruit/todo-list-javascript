
function List (input, list) {
  this.input = input;
  this.listContainer = list;
  this.todos = [];
  this.todosInProgress = ["dsfsfsdf"];
  this.todosCompleted = [];
  this.type = ["pipeline","inprogress","completed"];
  this.priority = [1,2,3];
}

List.prototype = {
  getInput: function () {
    return this.input.value;
  },
  clearInput: function () {
    this.input.value = "";
  },
  addTask: function (){
    var task = this.getInput();
    if(task){
      this.todos.push(task);
      this.showPipeline();
    }
  },
  showInProgress: function (){
    var todos = this.todosInProgress;
    this.type = "inprogress";
    this.show(todos);
  },
  showPipeline(){
    var todos = this.todos;
    this.type = "pipeline";
    this.show(todos);
  },
  showCompleted() {
    var todos = this.todosCompleted;
    this.type = "completed";
    this.show(todos);
  },
  show: function (todos) {
    document.getElementById('todos').innerHTML ='';
    if(todos){
        var html = '';
        for(var i=0; i<todos.length; i++) {
            html += '<div class="list-item">' + todos[i] + ' <button class="remove" id="' + i  + '">Remove</button>'+ '<button class="move" id="' + i  + '">move</button></div>';
        };
        document.getElementById('todos').innerHTML = html;
        var _this = this;
        var buttons = document.getElementsByClassName('remove');
        for (var i=0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function(e){
              var id = this.getAttribute('id');
              _this.remove(id);
            });
        };
        document.getElementById('total').innerHTML = todos.length +" items left";
        this.clearInput();
    } else {
      document.getElementById('todos').innerHTML = '<div>No todo item found</div>';
    }
  },
  remove: function(id) {
      var todos = this.todos;
      todos.splice(id, 1);
      //localStorage.setItem('todo', JSON.stringify(todos));
      this.show(todos);
      return false;
 }
}

var list = new List(
  document.getElementById("task"),
  document.getElementById("todos")
);

document.getElementById("add").onclick = function () {
  list.addTask();
}

document.getElementById("pipeline").onclick = function () {
  var pipeline = document.getElementById("pipeline");
  pipeline.className += " selected";
  list.showPipeline();
}

document.getElementById("inprogress").onclick = function () {
  var inprogress = document.getElementById("inprogress");
  inprogress.className += " selected";
  list.showInProgress();
}

document.getElementById("completed").onclick = function () {
  var completed = document.getElementById("completed");
  completed.className += " selected";
  list.showCompleted();
}

window.addEventListener("keydown", function (e) {
  if ((e.keyCode || e.which) == 13) { // 13 is the keycode for "enter"
    document.getElementById("add").click();
  }
});
