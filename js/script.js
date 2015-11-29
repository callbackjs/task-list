(function(window, document, undefined) {
  var ENTER_KEY_CODE = 13;
  var STATUS_OK = 200;

  var taskTemplate = document.getElementById('task-template');
  var renderTaskTemplate = Handlebars.compile(taskTemplate.innerHTML);

  var taskInput = document.getElementById('task');
  var taskList = document.getElementById('task-list');

  var request = new XMLHttpRequest();
  request.addEventListener('load', function() {
    if (request.status === STATUS_OK) {
      var tasks = JSON.parse(request.responseText);

      tasks.forEach(function(task) {
        var li = document.createElement('li');
        li.innerHTML = renderTaskTemplate({ task: task.text });
        taskList.appendChild(li);
      });
    }
  });

  request.open('GET', '/tasks');
  request.send();

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
      var request = new XMLHttpRequest();
      request.addEventListener('load', function() {
        if (request.status === STATUS_OK) {
          var li = document.createElement('li');
          li.innerHTML = renderTaskTemplate({ task: taskInput.value });

          taskInput.value = "";
          taskList.appendChild(li);
        }
      });

      request.open('POST', '/tasks');
      request.send(JSON.stringify({ text: taskInput.value }));
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

})(this, this.document);
