let input_field = document.getElementById("input_field");
let add_btn = document.getElementById("add_btn");
let list_group = document.getElementById("list_group");
let input_group = document.getElementById("input_group");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => {
  list_group.appendChild(addTask(task));
});

function addTask(task) {
  const new_li = document.createElement("li");
  const new_p = document.createElement("p");
  const new_eb = document.createElement("button");
  const new_db = document.createElement("button");

  new_p.innerHTML = task;
  new_eb.innerHTML = "EDIT";
  new_db.innerHTML = "DELETE";

  new_eb.setAttribute("type", "button");
  new_db.setAttribute("type", "button");

  new_li.className += "list-group-item d-flex align-items-center";
  new_p.className += "p-0 m-0 flex-grow-1 ps-2";
  new_eb.className += "btn btn-primary";
  new_db.className += "btn btn-danger mx-1";

  new_li.appendChild(new_p);
  new_li.appendChild(new_eb);
  new_li.appendChild(new_db);

  new_db.addEventListener("click", function (event) {
    deleteTask(event.target);
  });

  new_eb.addEventListener("click", function (event) {
    edittask(event.target);
  });

  return new_li;
}

function edittask(edit_btn) {
  add_btn.style.display = "none";
  let update_btn = document.getElementById("update_btn");

  if (!update_btn) {
    update_btn = document.createElement("button");
    update_btn.id = "update_btn";
    update_btn.className = "btn btn-success";
    update_btn.innerHTML = "UPDATE";
    input_group.appendChild(update_btn);
  }

  const edit_item = edit_btn.parentNode;
  let index = Array.from(list_group.children).indexOf(edit_item);

  const edit_task = tasks[index];
  input_field.value = edit_task;
  input_field.focus();

  update_btn.addEventListener("click", function () {
    update(index, edit_item);
  });
}

function update(index, edit_item) {
  tasks[index] = input_field.value;
  localStorage.setItem("tasks", JSON.stringify(tasks));

  const new_li = addTask(tasks[index]);
  list_group.replaceChild(new_li, edit_item);

  add_btn.style.display = "block";
  input_group.removeChild(update_btn);
  input_field.value = "";
}

function deleteTask(delete_btn) {
  const delete_Item = delete_btn.parentNode;
  const index = Array.from(list_group.children).indexOf(delete_Item);
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  list_group.removeChild(delete_Item);
}

function savetask() {
  if (input_field.value !== "") {
    const new_item = addTask(input_field.value);
    list_group.appendChild(new_item);

    tasks.push(input_field.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input_field.value = "";
  }
}

add_btn.addEventListener("click", savetask);

input_field.addEventListener('keypress', function (event) {
  if (event.key === "Enter") {
    var update_btn = document.getElementById("update_btn");
    if (!update_btn) {
      savetask();
    } else {
      update_btn.click();
    }
  }
});