document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.querySelector("#todo-input");
  const addTaskButton = document.querySelector("#add-task");
  const todoList = document.querySelector(".todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  addTaskButton.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    if (todoText === "") return;

    const newTask = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };

    tasks.push(newTask);
    renderTask(newTask);
    saveTasks();
    todoInput.value = "";
  });

  function renderTask(task) {
    const div = document.createElement("div");
    div.classList.add("list-item");

    const li = document.createElement("li");
    li.classList.add("task-name");
    if (task.completed) li.classList.add("completed");
    li.innerHTML = task.text;

    li.addEventListener("click", (e) => {
      e.stopPropagation();
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    const button = document.createElement("button");
    button.classList.add("danger-button");
    button.innerHTML = "Delete";

    button.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      div.remove();
      saveTasks();
    });

    div.appendChild(li);
    div.appendChild(button);

    todoList.appendChild(div);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
