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
import { checkboxListener } from './handlers.js';
import { loadHome, loadToday, loadThisWeek, loadImportant, loadCompleted } from './loadTabs';

// globals
const container = document.querySelector("#content");

window.addEventListener("load", () => {
  // load home page
  // sidebar
  // header & top bar 
  // main default home content
  container.innerHTML = "";
  // container.insertAdjacentHTML("beforeend", navHTML);
  container.insertAdjacentHTML("beforeend", defaultHTML);

  // load previous stored local storage tasks/folders
  ToDo.renderToDo("todo-container", ToDo.tasksArray);
  Folder.renderFolders();

  // task & folder event listener
  todoAdd(ToDo.tasksArray, "tasks", ToDo.tasksArray);
  folderAdd();
  folderListener();
  console.log(Folder.folderTasks);

  // ui functions
  toggleDarkMode();
  timeGreeting();
  dynamicDate();
  displayTaskCount(ToDo.taskCount);

  // page event listeners
  loadHome(document.querySelector("#todo-container"));
  loadToday(document.querySelector("#todo-container"));
  loadThisWeek(document.querySelector("#todo-container"));
  loadImportant(document.querySelector("#todo-container"));
  loadCompleted(document.querySelector("#todo-container"));

  // displayTaskCheck();

  feather.replace();
})

// todo features handler
document.addEventListener("click", (e) => {
  // delete
  if (e.target.id === "del-btn") {
    const delTaskIndex = e.target.getAttribute("data-index");
    // console.log(taskIndex);
    ToDo.delete(delTaskIndex);
    localStorage.removeItem(delTaskIndex); // remove checked id (so the next added task wont get checked)
    displayTaskCount(ToDo.taskCount);
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

  // if the displayCount is enabled here it will override the taskcount of other taskcount (e.g the completed task)
  // displayTaskCount(ToDo.taskCount);
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

    ToDo.renderToDo("todo-container", ToDo.tasksArray);
    feather.replace();
    closeModal(document.querySelector("#todo_modal"));
  })
}

// todo btn
const todoAdd = (array, key, optionalArray) => {
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
    console.log(array, key, optionalArray);
    listenToDoSubmit(array, key, optionalArray);
  })
}

// submit eventlistener todo
function listenToDoSubmit(array, key, optionalArray)  {
  const addFormDOM = getFormDOM();
  const $addToDoForm = document.querySelector("#add-todo-form");

  $addToDoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = new ToDo(addFormDOM.$title.value, addFormDOM.$description.value, addFormDOM.$date.value, addFormDOM.$priority.value);

    task.addToDo(array, key, optionalArray); // adds task to desired array
    // localStorage.setItem(key, JSON.stringify(array))

    ToDo.renderToDo("todo-container", ToDo.tasksArray);
    feather.replace();
    closeModal(document.querySelector("#todo_modal"));
    displayTaskCount(ToDo.taskCount);
  })
}

// folder add btn
const folderAdd = () => {
  const folderPlusBtn = document.querySelector("#add-folder");
  folderPlusBtn.addEventListener("click", () => {
    const folderModalContent = folderModal("Add Folder", "");

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

const folderListener = () => {
  document.querySelector("#folder-container").addEventListener("click", (e) => {
    // edit btn
    if (e.target.id === "folder-edit-btn") {
      const folderIndex = e.target.getAttribute("folder-data-index");
      const currentFolderIndex = Folder.foldersArray[folderIndex];

      // assign value to modal
      const folderEditContent = folderModal("Edit Folder", currentFolderIndex.title);
      
      // close previous modal
      closeModal(document.querySelector("#folder_modal"));
      // create div el append the el to body
      const formModalContainer = document.createElement("div");
      formModalContainer.innerHTML = folderEditContent;
      document.body.appendChild(formModalContainer);

      // show the modal
      document.querySelector("#folder_modal").showModal();

      // listen for submit
      editFolderSubmit(currentFolderIndex);
    }

    // del btn
    if (e.target.id === "folder-del-btn") {
      const folderIndex = e.target.getAttribute("folder-data-index");
      // const currentFolderIndex = Folder.foldersArray[folderIndex];
      Folder.deleteFolder(folderIndex);
      // Folder.folderTasks.remove(folderIndex);
    }

    // display tasks inside current folder 
    if (e.target.id === "folder-element") {
      // get the index
      const folderIndex = e.target.getAttribute("folder-data-index");
      const currentFolderTasks = Folder.folderTasks[folderIndex];
      ToDo.renderToDo("todo-container", currentFolderTasks);

      todoAdd(currentFolderTasks, "folder-task", Folder.folderTasks);
      // assign the corresponding display task count
      displayTaskCount(currentFolderTasks.length);
      feather.replace();
    }

  })
}

const editFolderSubmit = (folderTarget) => {
  const $folderForm = document.querySelector("#folder-form");

  $folderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const editInputTitle = $folderForm.querySelector("#folder-title");
    folderTarget.title = editInputTitle.value || folderTarget.title;

    localStorage.setItem("folders", JSON.stringify(Folder.foldersArray));

    Folder.renderFolders()
    feather.replace();
    closeModal(document.querySelector("#folder_modal"));
  })
}

// event listener for checkbox change
checkboxListener();

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

