const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const category = document.getElementById("category");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addBtn.addEventListener("click", () => {

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    const task = {
        text: taskText,
        category: category.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

function renderTasks(){

    taskList.innerHTML = "";

    let remaining = 0;

    if(tasks.length === 0){

        taskList.innerHTML = `
        <li class="empty-message">
        No tasks yet. Add your first task.
        </li>
        `;

        taskCount.textContent = 0;
        return;
    }

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.classList.add("task-item");

        if(task.completed){
            li.classList.add("completed");
        }else{
            remaining++;
        }

        li.innerHTML = `
        <div>
            <strong>${task.category}</strong><br>
            ${task.text}
        </div>

        <div class="actions">

            <button class="complete-btn">
                ${task.completed ? "Undo" : "Complete"}
            </button>

            <button class="delete-btn">
                Delete
            </button>

        </div>
        `;

        li.querySelector(".complete-btn")
        .addEventListener("click",()=>{

            tasks[index].completed =
            !tasks[index].completed;

            saveTasks();
            renderTasks();

        });

        li.querySelector(".delete-btn")
        .addEventListener("click",()=>{

            tasks.splice(index,1);

            saveTasks();
            renderTasks();

        });

        taskList.appendChild(li);

    });

    taskCount.textContent = remaining;
}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}