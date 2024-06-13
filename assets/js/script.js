// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const titleInput = $("#taskTitle");
const dateInput = $("#taskDeadline");
const descInput = $("#taskDescription");
const taskForm = $("#taskForm");

// TODO: create a function to generate a unique task id
function generateTaskId() {
  return nextId++;
}

// TODO: create a function to create a task card
function createTaskCard(task) {
  const card = $("<div>").addClass("card");
  const cardBody = $("<div>").addClass("card-body");
  const cardTitle = $("<div>").addClass("card-title").text(task.title);
  const cardDate = $("<div>").addClass("card-subtitle").text(task.date);
  const cardDesc = $("<div>").addClass("card-text").text(task.desc);
  const cardDelete = $("<button>")
    .addClass("btn btn-danger delete")
    .text("Delete")
    .attr("data-task-id", task.id);
  cardBody.append(cardTitle, cardDate, cardDesc, cardDelete);
  card.append(cardBody);
  card.appendTo("#todo-cards");
}

// TODO: create a function to render the task list and make cards draggable
function renderTaskList() {
  taskList.forEach(function (task) {
    createTaskCard(task);
  });
}

// TODO: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const title = titleInput.val();
  const date = dateInput.val();
  const desc = descInput.val();

  const newTask = {
    id: generateTaskId(),
    title: title,
    date: dayjs(date).format("YYYY-MM-DD"),
    desc: desc,
    status: "to-do",
  };

  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  createTaskCard(newTask);
}

// TODO: create a function to handle deleting a task
function handleDeleteTask(event) {
  const taskId = $(event.target).attr("data-task-id");
  taskList = taskList.filter(function (task) {
    return task.id != taskId;
  });
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// TODO: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// TODO: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  dateInput.datepicker({
    dateFormat: "yy-mm-dd",
  });

  taskForm.on("submit", handleAddTask);
  $(document).on("click", ".delete", handleDeleteTask);
  renderTaskList();
});
