const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") addTask();
});

if (!localStorage.getItem("finishedTasks")) {
    localStorage.setItem("finishedTasks", JSON.stringify([]));
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;
    li.appendChild(span);

    const finishBtn = document.createElement("button");
    finishBtn.textContent = "Finished!";
    finishBtn.className = "delete-btn";

    finishBtn.addEventListener("click", () => {
        saveFinishedTask(taskText);
        li.remove();
    });

    li.appendChild(finishBtn);
    taskList.appendChild(li);

    taskInput.value = "";
}

function saveFinishedTask(task) {
    let finished = JSON.parse(localStorage.getItem("finishedTasks"));
    finished.push(task);
    localStorage.setItem("finishedTasks", JSON.stringify(finished));
}
    const finishedList = document.getElementById("finishedList");
    const finishedTasks = JSON.parse(localStorage.getItem("finishedTasks")) || [];
    finishedTasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        finishedList.appendChild(li);
    });

    document.getElementById("clearBtn").addEventListener("click", () => {
        localStorage.removeItem("finishedTasks");
        finishedList.innerHTML = "";
        alert("All completed tasks have been cleared!");
    });