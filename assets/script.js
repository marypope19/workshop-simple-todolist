document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitButton");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const todos = [];
  let newId = 0;

  submitButton.addEventListener("click", addTask);
  taskInput.addEventListener("keyup", activateSubmitButton);
  taskList.addEventListener("click", eventHandler);

  function activateSubmitButton() {
    if (taskInput.checkValidity()) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  function eventHandler(event) {
    let listId = parseInt(event.target.dataset.listid);
    let iconId = parseInt(event.target.dataset.iconid);
    switch (event.target.tagName) {
      case "LI":
        toggleCompletion(listId);
        break;
      case "I":
        removeTask(iconId);
        break;
    }
  }

  function removeTask(id) {
    todos.forEach(function (li, index) {
      if (li.id === id) {
        // REMOVE LI FROM UL
        todos.splice(index, 1);
      }
    });
    renderList();
  }

  function toggleCompletion(id) {
    todos.forEach(function (task) {
      if (task.id === id) {
        // TOGGLE COMPLETION
        task.completed = !task.completed;
      }
    });
    renderList();
  }

  function addTask(event) {
    event.preventDefault();

    const newTask = {
      id: newId++,
      task: taskInput.value,
      completed: false,
    };

    taskInput.value = "";
    activateSubmitButton();

    todos.push(newTask);
    renderList();

    taskInput.value = "";
  }

  function renderList() {
    taskList.innerHTML = "";

    todos.forEach(function(item) {
      const li = `<li class="list-group-item ${item.completed ? 'completed' : ''}" data-listId="${item.id}">${item.task}<i class="fas fa-trash-can fa-fw" data-iconId="${item.id}"></i></li>`

      li.textContent = item.task;

      taskList.innerHTML += li;
    });
  }
});
