var ENTER_KEY_CODE = 13;

var taskTemplate = document.getElementById('task-template');
var renderTaskTemplate = Handlebars.compile(taskTemplate.innerHTML);

var taskInput = document.getElementById('task');
var taskList = document.getElementById('task-list');

if (localStorage.tasks) {
  taskList.innerHTML = localStorage.tasks;
}

taskInput.addEventListener("keydown", function(event) {
  if (event.keyCode === ENTER_KEY_CODE) {
    event.preventDefault();
    addTaskToList();
  }
});

/* Adds a new task item to the list, with the value from the
 * given input.
 *
 * Arguments:
 * taskInput -- the HTMLElement input tag
 */
function addTaskToList() {
  if (taskInput.value) {
    var li = document.createElement('li');
    li.innerHTML = renderTaskTemplate({ task: taskInput.value });

    taskInput.value = "";
    taskList.appendChild(li);
    localStorage.tasks = taskList.innerHTML;
  }
}

taskList.addEventListener('click', function(event) {
  var target = event.target;
  var li = target.parentNode;

  if (target.classList.contains('check')) {
    event.preventDefault();
    if (li.classList.contains('checked')) {
      li.classList.remove('checked');
      target.innerHTML = '&#9744;';
    } else {
      li.classList.add('checked');
      target.innerHTML = '&#9745;';
    }

    localStorage.tasks = taskList.innerHTML;
  } else if (target.classList.contains("delete")) {
    event.preventDefault();
    li.parentNode.removeChild(li);
    localStorage.tasks = taskList.innerHTML;
  }
});
