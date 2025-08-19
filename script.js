//Eleman Seçimi
const form = document.querySelector("#addTaskForm");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;
//load items
loadItems();

eventListeners();

function loadItems() {
  todos = getItemsFromLS();
  todos.forEach(function (item) {
    createItem(item);
  });
}

function getItemsFromLS() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

//set item to local storage
function setItemToLS(newToDo) {
  todos = getItemsFromLS();
  todos.push(newToDo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createItem(newToDo) {
  //li oluşturma
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(newToDo));

  //a oluşturma
  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';
  li.appendChild(a);
  taskList.appendChild(li);
}

function eventListeners() {
  form.addEventListener("submit", addNewItem);
  taskList.addEventListener("click", deleteItem);
  btnDeleteAll.addEventListener("click", deleteAllItem);
}
function addNewItem(e) {
  if (input.value === "") {
    alert("Add new item!");
    // console.log("submit");
  }
  //create item
  createItem(input.value);
  setItemToLS(input.value);

  input.value = "";
  e.preventDefault();
}

function deleteItem(e) {
  if (e.target.className == "fas fa-times") {
    if (confirm("Silmek istediğinizden emin misiniz?")) {
      e.target.parentElement.parentElement.remove();
      deleteToDoFromLS(e.target.parentElement.parentElement.textContent);
    }
  }
}

function deleteToDoFromLS(deletetodo) {
  let todos = getItemsFromLS();
  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteAllItem(e) {
  if (confirm("Hepsini silmek istediğinize emin misiniz?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
}
