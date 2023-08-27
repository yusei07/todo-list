import './style.css';
import { toggleDarkMode, timeGreeting, dynamicDate, displayTaskCount } from './dom.js';
import { ToDo } from './task.js';

const $todoForm = document.querySelector("#todo-form")
const $title = document.querySelector("#title");
const $description = document.querySelector("#desc");
const $date = document.querySelector("#date");
const $priority = document.querySelector("#status");

window.addEventListener("load", () => {
  ToDo.renderToDo();
  feather.replace();
})

// test cases


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
$folderForm.addEventListener("submit", (e) => {
  e.preventDefault();
})

const clearForm = () => {
  $title.value = "";
  $description.value = "";
  $date.value = "";
}

// ui functions
toggleDarkMode();
timeGreeting();
dynamicDate();
displayTaskCount();
