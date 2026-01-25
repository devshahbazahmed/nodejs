const todoInput = document.querySelector("#todo-input");
const addTaskButton = document.querySelector("#add-task");
const todoList = document.querySelector(".todo-list");

const tasks = [];

addTaskButton.addEventListener("click", () => {
  console.log(todoInput.value);
  const newTask = {
    id: Date.now(),
    taskName: todoInput.value,
    completed: false,
  };
  tasks.push(newTask);
  console.log(tasks);
});
