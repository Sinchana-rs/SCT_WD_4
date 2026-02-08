let tasks = [];
let currentFilter = "All";

function addTask() {
    const taskText = document.getElementById("taskInput").value;
    const category = document.getElementById("category").value;
    const dateTime = document.getElementById("dateTime").value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        category: category,
        dateTime: dateTime,
        status: "Pending"
    };

    tasks.push(task);
    document.getElementById("taskInput").value = "";
    document.getElementById("dateTime").value = "";
    displayTasks();
}

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks
        .filter(task => currentFilter === "All" || task.status === currentFilter)
        .forEach(task => {
            const li = document.createElement("li");
            li.className = "task" + (task.status === "Completed" ? " completed" : "");

            li.innerHTML = `
                <div class="task-header">
                    <span>${task.text}</span>
                    <span class="badge">${task.category}</span>
                </div>
                <small>${task.dateTime ? task.dateTime.replace("T", " ") : ""}</small>
                <div class="task-actions">
                    <button class="complete-btn" onclick="toggleStatus(${task.id})">
                        ${task.status === "Pending" ? "Complete" : "Undo"}
                    </button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            list.appendChild(li);
        });
}

function toggleStatus(id) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, status: task.status === "Pending" ? "Completed" : "Pending" }
            : task
    );
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
}

function filterTasks(status) {
    currentFilter = status;
    displayTasks();
}
