console.log("js working");

const nameEl = document.getElementById("name");
const userNameEl = document.getElementById("userName");
const addUserBtn = document.getElementById("addUser");
const passwordEl = document.getElementById("password");
const cancelBtn = document.getElementById("cancel");
const statusMsgEl = document.getElementById("statusMsg");

addUserBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const task = {
    name: nameEl.value,
    username: userNameEl.value,
    password: passwordEl.value,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(task),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  fetch("http://localhost:8083/api/users", options).then((response) => {
    console.log(response.status);
    statusMsgEl.textContent = "User Added";
  });
});

cancelBtn.addEventListener("click", () => {
  location.href = "./todos.html";
});
