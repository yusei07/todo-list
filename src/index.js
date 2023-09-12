// imports
import './style.css';
import { 
  toggleDarkMode,
  timeGreeting,
  dynamicDate,
  displayTaskCount,
  showInfoModal,
  dynamicModal,
  folderModal
} from './dom.js';
import {
  defaultHTML
} from './htmlComponents.js'
import { ToDo } from './task.js';
import { Folder } from './folder.js';
import { displayComplete } from './handlers.js';

// globals
const container = document.querySelector("#content");
// const $todoContainer = document.querySelector("#todo-container");

window.addEventListener("load", () => {
  // load home page
  // sidebar
  // header & top bar 
  // main default home content
  container.innerHTML = "";
  // container.insertAdjacentHTML("beforeend", navHTML);
  container.insertAdjacentHTML("beforeend", defaultHTML);

  // load previous stored local storage tasks/folders
  ToDo.renderToDo(); 
  Folder.renderFolders();

  // add a bunch of listeners here
  todoAdd();
  folderAdd();

  // ui functions
  toggleDarkMode();
  timeGreeting();
  dynamicDate();
  displayTaskCount();

  displayComplete(); // completed page
  // displayTaskCheck();
  checkCheckboxState();

  feather.replace();
})

// page handler 
container.addEventListener("click", (e) => {
  if (e.target.id === "home-page") {
    // clear previous html and classes
    container.innerHTML = "";
    container.insertAdjacentHTML("beforeend", navHTML);
    container.insertAdjacentHTML("beforeend", landingHTML);
    menuSmListener();
    feather.replace();
  } else if (e.target.id === "today-page") {
    displayMenu(container);
    menuSmListener();
  } else if (e.target.id === "week-page") {
    displayStory(container);
    menuSmListener();
  } else if (e.target.id === "important-page") {
    displayContact(container);
    menuSmListener();
  } else if (e.target.id === "completed-page") {
    displayCompletedPage()
  }
})

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

// edit submit listener & handler
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

// todo btn
const todoAdd = () => {
  const addToDoBtn = document.querySelector("#add-todo");
  const mainContainer = document.querySelector("#main-container");

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
}

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

// folder add btn
const folderAdd = () => {
  const folderPlusBtn = document.querySelector("#add-folder");
  folderPlusBtn.addEventListener("click", () => {
    const folderModalContent = folderModal();

    closeModal(document.querySelector("#folder_modal"));

    const formModalContainer = document.createElement("div");
    formModalContainer.innerHTML = folderModalContent;
    document.body.appendChild(formModalContainer);

    document.querySelector("#folder_modal").showModal();

    listenFolderSubmit();
  })
}

// submit eventlistener folder
function listenFolderSubmit() {
  const $folderForm = document.querySelector("#folder-form");
  const folderTitle = document.querySelector("#folder-title");

  $folderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const folder = new Folder(folderTitle.value);
    console.log(folderTitle.value);
    folder.addFolder();
    closeModal(document.querySelector("#folder_modal"));
    Folder.renderFolders();
    feather.replace();
  })
}

const saveCheckboxState = (checkboxId, isChecked) => {
  localStorage.setItem(checkboxId, isChecked); // e.g  1 : true
}

const loadCheckboxState = (checkboxId) => {
  const isChecked = localStorage.getItem(checkboxId);
  if (isChecked === "true") {
    const checkbox = document.getElementById(checkboxId);
    const spanElement = checkbox.nextElementSibling;

    if (checkbox) {
      checkbox.checked = true; // check the checkbox
    }

    if (spanElement) {
      spanElement.innerHTML = `<strike>${spanElement.textContent}</strike>`; // apply strike-through
    }
  }
}

// event listener for chckbox change
document.addEventListener("change", (e) => {
  // Check if the changed element is an input with the id "check-btn"
  if (e.target.classList.contains("check-btn")  && e.target.type === "checkbox") {
    // toggle complete
    const currentIndex = e.target.getAttribute("data-index");
    const currentTaskIndex = ToDo.tasksArray[currentIndex];
    const currentId = currentIndex;

    // select the span (title span)
    const spanElement = e.target.nextElementSibling;

    if (spanElement) {
      if (e.target.checked) {
        currentTaskIndex.completed = true;
        spanElement.innerHTML = `<strike>${spanElement.textContent}</strike>`;
      } else {
        currentTaskIndex.completed = false;
        spanElement.innerHTML = spanElement.textContent;
      }
    }

    saveCheckboxState(currentId, currentTaskIndex.completed);
    localStorage.setItem("tasks", JSON.stringify(ToDo.tasksArray)); // update task date in local storage 
  }
});

const checkCheckboxState = () => {
  const allTask = document.querySelectorAll('#todo-container input[type="checkbox"]');
  allTask.forEach(checkbox => {
    loadCheckboxState(checkbox.id);
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

const closeModal = (existingModal) => {
  if (existingModal) {
    existingModal.remove();
  }
}
