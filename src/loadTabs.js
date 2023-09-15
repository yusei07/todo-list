import { ToDo } from './task.js';
import { getCompletedTasks, completedTaskCount, getImportantTasks, getToday, getThisWeek } from './handlers.js';
import { displayTaskCount, highlightCurrentTab } from './dom.js';

// const todoContainer = document.querySelector("#todo-container");

export const loadHome = (container) => {
  const homePage = document.querySelector("#home-page");
  homePage.addEventListener("click", () => {
    container.innerHTML = "";
    highlightCurrentTab(homePage);
    displayToDoAddBtn();
    ToDo.renderToDo("todo-container", ToDo.tasksArray)
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

    // make all checkbox checked & title strike-through
    const allTaskCheckboxes = document.querySelectorAll('#todo-container input[type="checkbox"]');
    const allTaskTitles = document.querySelectorAll('#todo-container #task-title');
    
    allTaskCheckboxes.forEach((checkbox, index) => {
      checkbox.checked = true;
      const title = allTaskTitles[index];
      title.innerHTML = `<strike>${title.textContent}</strike>`; // apply strike-through
    });

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

