const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");
const taskList = document.getElementById("taskList");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [];

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const task = {
    id: Date.now(),
    text: taskInput.value,
    due: dueDate.value,
    priority: priority.value,
    completed: false
  };
  tasks.push(task);
  taskInput.value = "";
  dueDate.value = "";
  priority.value = "Medium";
  renderTasks();
});

function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  let filteredTasks = tasks;
  if (filter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filter === "pending") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");
    li.innerHTML = `
      <div>
        <strong>${task.text}</strong><br/>
        <small>Due: ${task.due || "N/A"} | Priority: ${task.priority}</small>
      </div>
      <div class="task-buttons">
        <button onclick="toggleComplete(${task.id})">${task.completed ? "Undo" : "Done"}</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  updateStats();
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function updateStats() {
  totalCount.textContent = tasks.length;
  completedCount.textContent = tasks.filter(t => t.completed).length;
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    renderTasks(filter);
  });
});
