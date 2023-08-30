// imports
import './style.css';
import { toggleDarkMode, timeGreeting, dynamicDate, displayTaskCount, showInfoModal } from './dom.js';
import { ToDo } from './task.js';

// globals
const $todoForm = document.querySelector("#todo-form")
const $title = document.querySelector("#title");
const $description = document.querySelector("#desc");
const $date = document.querySelector("#date");
const $priority = document.querySelector("#status");
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
    const taskIndex = e.target.getAttribute("data-index");
    ToDo.delete(taskIndex);
  }

  // info
  if (e.target.id === "info-btn") {
    // get index
    const infoTaskIndex = e.target.getAttribute("data-index");
    const currentTask = ToDo.tasksArray[infoTaskIndex];

    // assign value to modal
    const infoModalContent = showInfoModal(currentTask.title, currentTask.description, currentTask.date);

    // remove existing modal if exists
    const existingModal = document.querySelector("#info_modal");
    if (existingModal) {
      existingModal.remove();
    }

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

// submit eventlistener todo
$todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = new ToDo($title.value, $description.value, $date.value, $priority.value);
  task.addToDo();
  ToDo.renderToDo();
  feather.replace();
  clearForm();
  displayTaskCount();
})

// submit eventlistender folder
const $folderForm = document.querySelector("#folder-form");
// $folderForm.addEventListener("submit", (e) => {
//   e.preventDefault();
// })

function clearForm() {
  $title.value = "";
  $description.value = "";
  $date.value = "";
}

// ui functions
toggleDarkMode();
timeGreeting();
dynamicDate();
displayTaskCount();
