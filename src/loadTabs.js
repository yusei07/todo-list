import { ToDo } from './task.js';
import { getCompletedTasks, completedTaskCount, getImportantTasks, getToday, getThisWeek, toDoFeatureHandler } from './handlers.js';
import { displayTaskCount, highlightCurrentTab } from './dom.js';

// const todoContainer = document.querySelector("#todo-container");

export const loadHome = (container) => {
  const homePage = document.querySelector("#home-page");
  homePage.addEventListener("click", () => {
    container.innerHTML = "";
    highlightCurrentTab(homePage);
    displayToDoAddBtn();
    ToDo.renderToDo("todo-container", ToDo.tasksArray)
    // make todofeaturehandler array ToDo.tasksArray
    // console.log(ToDo.tasksArray);
    toDoFeatureHandler(ToDo.tasksArray);
    displayTaskCount(ToDo.taskCount);
    // feather.replace();
  })
}

export const loadToday = (container) => {
  const todayPage = document.querySelector("#today-page");
  todayPage.addEventListener("click", () => {
    container.innerHTML = "";
    highlightCurrentTab(todayPage);
    removeToDoAddBtn();
    const todayTasks = getToday();
    ToDo.renderToDo("todo-container", todayTasks)
    // make todofeaturehandler array todayTasks
    console.log("Today's tasks", todayTasks);
    toDoFeatureHandler(todayTasks);
    displayTaskCount(todayTasks.length);
  })
}

export const loadThisWeek = (container) => {
  const weekPage = document.querySelector("#week-page");
  weekPage.addEventListener("click", () => {
    container.innerHTML = "";
    highlightCurrentTab(weekPage);
    removeToDoAddBtn();
    const thisWeekTasks = getThisWeek(ToDo.tasksArray);
    ToDo.renderToDo("todo-container", thisWeekTasks)
    // make todofeaturehandler array thisWeekTasks 
    // console.log(thisWeekTasks);
    toDoFeatureHandler(thisWeekTasks);
    displayTaskCount(thisWeekTasks.length);
  })
}

export const loadImportant = (container) => {
  const importantPage = document.querySelector("#important-page");
  importantPage.addEventListener("click", () => {
    highlightCurrentTab(importantPage);
    container.innerHTML = "";
    removeToDoAddBtn();
    const importantTasks = getImportantTasks();
    ToDo.renderToDo("todo-container", importantTasks) // make the getImportantTasks function
    // make todofeaturehandler array thisWeekTasks 
    // console.log(importantTasks);
    toDoFeatureHandler(importantTasks);
    displayTaskCount(importantTasks.length);
  })
}

// TODO: when the user clicks on the checbox again, rerender the todo again of completed tasks
export const loadCompleted = (container) => {
  const completedPage = document.querySelector("#completed-page");
  completedPage.addEventListener("click", () => {
    // clear the task container content
    container.innerHTML = "";
    highlightCurrentTab(completedPage);
    removeToDoAddBtn();
    // load completed tasks
    const completedTasks = getCompletedTasks();
    ToDo.renderToDo("todo-container", completedTasks)
    // make todofeaturehandler array thisWeekTasks 
    toDoFeatureHandler(completedTasks);
    displayTaskCount(completedTaskCount());
  })
}

const removeToDoAddBtn = () => {
  const addBtn = document.querySelector("#add-todo");
  addBtn.classList.add('hidden');
}

const displayToDoAddBtn = () => {
  const addBtn = document.querySelector("#add-todo");
  addBtn.classList.remove('hidden');
}

// export const displayNotes = (container) => {}

// get main content dom
// get from dom.js the html element/components
// make the current tab on the sidebar different text & bg color (indicating that the user is on the current tab)

