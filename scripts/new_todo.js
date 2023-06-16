console.log("js working");
const welcomeMsgEl = document.getElementById("welcomeMsg");
const instructionMsgEl = document.getElementById("instructionMsg");
const name = sessionStorage.getItem("name");
const userID = sessionStorage.getItem("id");
const catSelectEl = document.getElementById("catSelect");
const taskDescEl = document.getElementById("taskDesc");
const deadlineEl = document.getElementById("deadline");
const addTaskBtn = document.getElementById("addTask");
const priorityEl = document.getElementById("priority");
const cancelBtn = document.getElementById("cancel");
const statusMsg = document.getElementById("statusMsg");

if (name) {
  welcomeMsgEl.textContent = `Welcome, ${name}`;
  instructionMsgEl.textContent = "New Task";
}

genCatDrop(catSelectEl, "http://localhost:8083/api/categories");

addTaskBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const task = {
    userid: userID,
    category: catSelectEl.value,
    description: taskDescEl.value,
    deadline: deadlineEl.value,
    priority: priorityEl.value,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(task),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  fetch("http://localhost:8083/api/todos", options)
    .then((promise) => promise.json())
    .then((response) => {
      console.log(response.status);
      statusMsgEl.textContent = "Task Added";
    });
});

cancelBtn.addEventListener("click", () => {
  location.href = "./todos.html";
});

async function genCatDrop(dropdown, url) {
  const promise = await fetch(url);
  const categories = await promise.json();
  categories.forEach((category) => {
    const opt = new Option(category.name);
    dropdown.appendChild(opt);
  });
}
