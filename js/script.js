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
    li.innerHTML += " <span class=\"delete\"></span> <span class=\"check\"></span>"

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
  checkbox.addEventListener('click', () => {
    li.classList.toggle('checked')
  })

  const deleteButton = li.querySelector('.delete')
  deleteButton.addEventListener('click', () => {
    li.parentNode.removeChild(li)
  })
}
