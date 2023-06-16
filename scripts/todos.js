console.log("js working");
const userSelectEl = document.getElementById("userSelect");
const addTaskBtn = document.getElementById("addTask");
const addUserBtn = document.getElementById("addUser");
const userInfoTbl = document.getElementById("userInfo");
const headers = [
  "Completed",
  "Category",
  "Description",
  "Deadline",
  "Priority",
];
addTaskBtn.style.display = "none";

addUserBtn.addEventListener("click", () => {
  location.href = "./newUser.html";
});
addTaskBtn.addEventListener("click", () => (location.href = "./new_todo.html"));

const userUrl = "http://localhost:8083/api/users";
fetch(userUrl)
  .then((promise) => promise.json())
  .then((users) => {
    users.forEach((user) => {
      const opt = new Option(user.name, user.id);
      userSelectEl.appendChild(opt);
    });
  });
userSelectEl.addEventListener("change", async () => {
  userInfoTbl.innerHTML = "";
  addTaskBtn.style.display = "inherit";
  const userId = userSelectEl.value;
  if (!userId) {
    addTaskBtn.style.display = "none";
    return;
  }
  const userName = document.querySelector(
    `option[value="${userId}"]`
  ).textContent;
  sessionStorage.setItem("id", userId);
  sessionStorage.setItem("name", userName);

  generateHeaders(headers, userInfoTbl);
  const todosPromise = await fetch(
    `http://localhost:8083/api/todos/byuser/${userId}`
  );
  const tasks = await todosPromise.json();
  tasks.forEach((task) => {
    const row = userInfoTbl.insertRow();
    headers.forEach((heading) => {
      const cell = row.insertCell();
      if (heading === "Completed") {
        cell.outerHTML = `<td><input class="form-check-input" type="checkbox" id="task${task.id}" onclick="editStatus(${task.id})"></td>`;
        const completedCheckbox = userInfoTbl.querySelector(
          `input[id="task${task.id}"]`
        );
        if (task[heading.toLowerCase()]) {
          completedCheckbox.checked = true;
          completedCheckbox.disabled = true;
        }
      } else {
        cell.textContent = task[heading.toLowerCase()];
      }
    });
  });
});

function generateHeaders(headers, tbl) {
  const row = tbl.insertRow();
  headers.forEach((heading) => {
    const cell = row.insertCell();
    cell.textContent = heading;
  });
}
function showDetails(taskID) {
  console.log(taskID, "Details");
}
function editStatus(taskID) {
  const taskCheckbox = userInfoTbl.querySelector(`input[id="task${taskID}"]`);
  const taskUrl = `http://localhost:8083/api/todos/${taskID}`;
  const options = {
    method: "PUT",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  fetch(taskUrl, options).then((response) => {
    console.log(response.status);
    if (response.status === 200) taskCheckbox.disabled = true;
  });
}
