const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") addTask();
});

// Make sure finishedTasks storage exists
if (!localStorage.getItem("finishedTasks")) {
    localStorage.setItem("finishedTasks", JSON.stringify([]));
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    
    // Put the text in a span so the button doesn't overwrite it
    const span = document.createElement("span");
    span.textContent = taskText;
    li.appendChild(span);

    const finishBtn = document.createElement("button");
    finishBtn.textContent = "Finished!";
    finishBtn.className = "delete-btn";

    finishBtn.addEventListener("click", () => {
        saveFinishedTask(taskText); // Save to localStorage
        li.remove(); // Remove from current list
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
