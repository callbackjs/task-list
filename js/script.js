var ENTER_KEY_CODE = 13;

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

// Adds a new task item to the list with the value of `taskInput`
function addTaskToList() {
  if (taskInput.value) {
    var li = renderTaskTemplate(taskInput.value);

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

// Renders a task with the given text in the #task-list div.
function renderTaskTemplate(task) {
  var taskItem = tag('li', [
    task,
    tag('a', {class: "delete"}, "&#215;"),
    tag('a', {class: "check"}, "&#9744;")
  ]);
  return taskItem;
}

/* Creates and returns an HTMLElement representing a tag of the given name.
 * attrs is an object, where the key-value pairs represent HTML attributes to
 * set on the tag. contents is an array of strings/HTMLElements (or just a single
 * string/HTMLElement) that will be contained within the tag.
 *
 * Note that attrs is an optional parameter, and can be ommitted.
 *
 * Examples:
 * tag('p', 'A simple paragraph') => <p>A simple paragraph</p>
 * tag('a', {href: '/about'}, 'About') => <a href="/about">About</a>
 *
 * tag('ul', tag('li', 'First item')) => <ul><li>First item</li></ul>
 *
 * tag('div', [
 *   tag('h1', {'class': 'headline'}, 'JavaScript'),
 *   ' is awesome, ',
 *   tag('span', "especially in CS42.")
 * ])
 * => <div>
 *      <h1 class="headline">JavaScript</h1>
 *      is awesome,
 *      <span>especially in CS42.</span>
 *    </div>
 */
function tag(name, attrs, contents) {
  // attrs is optional
  if (!contents) {
    contents = attrs;
    attrs = [];
  }

  var element = document.createElement(name);
  for (var attr in attrs) {
    element.setAttribute(attr, attrs[attr]);
  }

  // If contents is a single string or HTMLElement, make it an array of one
  // element; this guarantees that contents is an array below.
  if (!(contents instanceof Array)) {
    contents = [contents];
  }

  contents.forEach(function(piece) {
    if (piece instanceof HTMLElement) {
      element.appendChild(piece);
    } else {
      // must create a text node for a raw string
      element.appendChild(document.createTextNode(piece));
    }
  });

  return element;
}
