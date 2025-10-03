// Sélecteurs
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Charger depuis localStorage
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task.text, task.done));
};

// Ajouter une tâche
addTaskBtn.addEventListener("click", () => {
  if (taskInput.value.trim() !== "") {
    addTask(taskInput.value);
    saveTasks();
    taskInput.value = "";
  }
});

// Fonction d’ajout
function addTask(text, done = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;
  if (done) span.classList.add("done");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.classList.add("completeBtn");
  completeBtn.addEventListener("click", () => {
    span.classList.toggle("done");
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
  saveTasks();
}

// Sauvegarde dans localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      done: li.querySelector("span").classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
