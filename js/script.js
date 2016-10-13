const ENTER_KEY_CODE = 13

const taskInput = document.getElementById('task')
const taskList = document.getElementById('task-list')

taskInput.addEventListener("keydown", event => {
  if (event.keyCode === ENTER_KEY_CODE) {
    event.preventDefault()
    addTaskToList()
  }
})

/* Adds a new task item to the list, with the value from the
 * given input.
 *
 * Arguments:
 * taskInput -- the HTMLElement input tag
 */
function addTaskToList() {
  if (taskInput.value)  {
    const li = document.createElement('li')
    li.textContent = taskInput.value
    li.innerHTML += " <a href=\"#\" class=\"delete\"></a> <a href=\"#\" class=\"check\"></a>"

    addTaskListeners(li)
    taskInput.value = ""
    taskList.appendChild(li)
  }
}

/* Handles check/delete events for the given task.
 *
 * Arguments:
 * taskLi -- the HTMLElement li tag
 */
function addTaskListeners(li) {
  const checkbox = li.querySelector('.check')
  checkbox.addEventListener('click', event => {
    event.preventDefault()

    if (li.classList.contains('checked')) {
      li.classList.remove('checked')
    } else {
      li.classList.add('checked')
    }
  })

  const deleteButton = li.querySelector('.delete')
  deleteButton.addEventListener('click', event => {
    event.preventDefault()
    li.parentNode.removeChild(li)
  })
}
