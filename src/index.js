// imports
import './style.css';
import { 
  toggleDarkMode,
  timeGreeting,
  dynamicDate,
  displayTaskCount,
  showInfoModal,
  dynamicModal
} from './dom.js';
import { ToDo } from './task.js';

// globals
const mainContainer = document.querySelector("#main-container");
const $todoContainer = document.querySelector("#todo-container");


// on page load
window.addEventListener("load", () => {
  // mainContainer.innerHTML = "";
  // container.insertAdjacentHTML("beforeend", navHTML);
  // container.insertAdjacentHTML("beforeend", landingHTML);

  // add a bunch of listeners here
  ToDo.renderToDo(); // load previous stored local storage tasks
  displayTaskCount();
  feather.replace();
})

// page handler 
// container.addEventListener("click", (e) => {
//   if (e.target.id === "home") {
//     // clear previous html and classes
//     container.innerHTML = "";
//     container.insertAdjacentHTML("beforeend", navHTML);
//     container.insertAdjacentHTML("beforeend", landingHTML);
//     menuSmListener();
//     feather.replace();
//   } else if (e.target.id === "menu") {
//     displayMenu(container);
//     menuSmListener();
//   } else if (e.target.id === "story") {
//     displayStory(container);
//     menuSmListener();
//   } else if (e.target.id === "contact") {
//     displayContact(container);
//     menuSmListener();
//   }
// })

// todo features handler
document.addEventListener("click", (e) => {
  // delete
  if (e.target.id === "del-btn") {
    const delTaskIndex = e.target.getAttribute("data-index");
    // console.log(taskIndex);
    ToDo.delete(delTaskIndex);
  }

  // edit
  if (e.target.id === "edit-btn") {
    const editTaskIndex = e.target.getAttribute("data-index");
    const currentEditTask = ToDo.tasksArray[editTaskIndex];

    // assign value to modal
    const editModalContent = dynamicModal("edit-todo-form", "Edit Task", currentEditTask.title, currentEditTask.description, currentEditTask.dueDate, "Edit");

    const previousModal = document.querySelector("#todo_modal");
    closeModal(previousModal);

    const editModalContainer = document.createElement("div");
    editModalContainer.innerHTML = editModalContent;
    document.body.appendChild(editModalContainer);

    const $todoModal = document.querySelector("#todo_modal");
    // call daisy ui method (showModal)
    $todoModal.showModal();
    listenEditSubmit(currentEditTask);
  }


  // info
  if (e.target.id === "info-btn") {
    // get index
    const infoTaskIndex = e.target.getAttribute("data-index");
    const currentTask = ToDo.tasksArray[infoTaskIndex];

    // assign value to modal
    const infoModalContent = showInfoModal(currentTask.title, currentTask.description, currentTask.dueDate, currentTask.priority);

    // remove existing modal if exists
    closeModal(document.querySelector("#info_modal"));

    // append the modal content to the body
    const modalContainer = document.createElement("div");
    modalContainer.innerHTML = infoModalContent;
    document.body.appendChild(modalContainer);

    // display modal
    const $infoModal = document.querySelector("#info_modal");
    $infoModal.showModal();
  }

  displayTaskCount();
  feather.replace();
});

// bug: im not getting the value of the edited title from the input
function listenEditSubmit(taskTarget) {
  const editFormDOM = getFormDOM();
  const $editToDoForm = document.querySelector("#edit-todo-form");
  // listen for submit
  $editToDoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // new value assign to the current task that is being edit
    const $editTitleInput = $editToDoForm.querySelector("#title");

    taskTarget.title = $editTitleInput.value || taskTarget.title;
    taskTarget.dueDate = editFormDOM.$date.value || taskTarget.dueDate;
    taskTarget.description = editFormDOM.$description.value || taskTarget.description;
    taskTarget.priority = editFormDOM.$priority.value || taskTarget.priority;

    localStorage.setItem("tasks", JSON.stringify(ToDo.tasksArray));

    ToDo.renderToDo();
    feather.replace();
    closeModal(document.querySelector("#todo_modal"));
  })
}

const addToDoBtn = document.querySelector("#add-todo");
addToDoBtn.addEventListener("click", () => {
  const addTaskContent = dynamicModal("add-todo-form", "Add Task", "", "", "", "Add");

  closeModal(document.querySelector("#todo_modal"));

  const addTaskModalContainer = document.createElement("div");
  // call daisy ui method (showModal)
  addTaskModalContainer.innerHTML = addTaskContent;
  mainContainer.appendChild(addTaskModalContainer);

  const $todoModal = document.querySelector("#todo_modal");
  // call daisy ui method (showModal)
  $todoModal.showModal();
  listenToDoSubmit();
})

// submit eventlistener todo
function listenToDoSubmit()  {
  const addFormDOM = getFormDOM();
  const $addToDoForm = document.querySelector("#add-todo-form");

  $addToDoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // const task = new ToDo($title.value, $description.value, $date.value, $priority.value);
    const task = new ToDo(addFormDOM.$title.value, addFormDOM.$description.value, addFormDOM.$date.value, addFormDOM.$priority.value);
    task.addToDo();
    ToDo.renderToDo();
    feather.replace();
    closeModal(document.querySelector("#todo_modal"));
    displayTaskCount();
  })
}

const getFormDOM = () => {
  const $title = document.querySelector("#title");
  const $description = document.querySelector("#desc");
  const $date = document.querySelector("#date");
  const $priority = document.querySelector("#status");
  return {
    $title,
    $description,
    $date,
    $priority
  };
}

// submit eventlistender folder
// const $folderForm = document.querySelector("#folder-form");
// $folderForm.addEventListener("submit", (e) => {
//   e.preventDefault();
// })

const closeModal = (existingModal) => {
  if (existingModal) {
    existingModal.remove();
  }
}

// ui functions
toggleDarkMode();
timeGreeting();
dynamicDate();
displayTaskCount();
