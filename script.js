const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const category = document.getElementById("category");

let count = 0;

addBtn.addEventListener("click", addTask);

function addTask(){

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");

    li.classList.add("task-item");

    li.innerHTML = `
        <div>
            <strong>${category.value}</strong><br>
            ${taskText}
        </div>

        <button class="delete-btn">
            Delete
        </button>
    `;

    taskList.appendChild(li);

    taskInput.value = "";

    count++;
    taskCount.textContent = count;

    removeEmptyMessage();

    li.querySelector(".delete-btn")
      .addEventListener("click", function(){

        li.remove();

        count--;
        taskCount.textContent = count;

        showEmptyMessage();

      });
}

function removeEmptyMessage(){

    const empty =
    document.querySelector(".empty-message");

    if(empty){
        empty.remove();
    }
}

function showEmptyMessage(){

    if(taskList.children.length === 0){

        taskList.innerHTML = `
        <li class="empty-message">
        No tasks yet. Add your first task.
        </li>
        `;
    }
}