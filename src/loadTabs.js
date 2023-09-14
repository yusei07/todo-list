import { ToDo } from './task.js';
import { getCompletedTasks, completedTaskCount, checkCheckboxState, getImportantTasks, getToday, getThisWeek } from './handlers.js';
import { displayTaskCount } from './dom.js';

// const todoContainer = document.querySelector("#todo-container");

export const loadHome = (container) => {
  document.querySelector("#home-page").addEventListener("click", () => {
    container.innerHTML = "";
    ToDo.renderToDo("todo-container", ToDo.tasksArray)
    displayTaskCount(ToDo.taskCount);
    // feather.replace();
  })
}

export const loadToday = (container) => {
  document.querySelector("#today-page").addEventListener("click", () => {
    container.innerHTML = "";
    const todayTasks = getToday();
    ToDo.renderToDo("todo-container", todayTasks)
    displayTaskCount(todayTasks.length);
  })
}

export const loadThisWeek = (container) => {
  document.querySelector("#week-page").addEventListener("click", () => {
    container.innerHTML = "";
    const thisWeekTasks = getThisWeek(ToDo.tasksArray);
    ToDo.renderToDo("todo-container", thisWeekTasks)
    displayTaskCount(thisWeekTasks.length);
  })
}

export const loadImportant = (container) => {
  document.querySelector("#important-page").addEventListener("click", () => {
    container.innerHTML = "";
    const importantTasks = getImportantTasks();
    ToDo.renderToDo("todo-container", importantTasks) // make the getImportantTasks function
    displayTaskCount(importantTasks.length);
  })
}

export const loadCompleted = (container) => {
  document.querySelector("#completed-page").addEventListener("click", () => {
    // clear the task container content
    container.innerHTML = "";
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

// export const displayCurrentFolder = (container) => {}
// export const displayNotes = (container) => {}

// get main content dom
// get from dom.js the html element/components
// make the current tab on the sidebar different text & bg color (indicating that the user is on the current tab)

