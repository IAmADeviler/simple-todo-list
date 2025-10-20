console.log("Hello this is todo website");
// Selecting dom element
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// Try to load save todos from localStorage (if any)
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
  // FUNC: Save current todos array to localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Create a dom node for a demo object and append it to the list
function createTodoNode(todo, index) {
  const li = document.createElement("li");

  //Checkbox to toggle completion
  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;

    // DONE: Visual feedback: Strike through when complete
    textSpan.style.textDecoration = todo.completed ? "line-through" : "";
    saveTodos();
  });

  // Text of the Todo
  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  textSpan.classList.add("text-span");
  textSpan.style.margin = "0 8px";
  if (todo.completed) {
    textSpan.style.textDecoration = "line-through";
  }
  // Add double click event listener to edit node
  textSpan.addEventListener("dblclick", () => {
    const newText = prompt("Edit Todo: ", todo.text);
    if (newText !== null) {
      todo.text = newText.trim();
      textSpan.textContent = todo.text;
      saveTodos();
    }
  });
  // Delete Todo Button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("del-btn");
  delBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    render();
    saveTodos();
  });

  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(delBtn);
  return li;
}
// Render the whole todo list from todos array

function render() {
  list.innerHTML = "";

  if (todos.length === 0) {
    const h2 = document.createElement("h2");
    h2.textContent = "YOU HAVE NO TODOS... ENJOY!!";
    h2.classList.add("no-todo");
    list.appendChild(h2);
    return;
  }

  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);
    list.appendChild(node);
  });
}

function addTodo() {
  const text = input.value.trim();
  if (!text) {
    return;
  }
  todos.push({ text, completed: false });
  input.value = "";
  render();
  saveTodos();
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    addTodo();
  }
});
render();
