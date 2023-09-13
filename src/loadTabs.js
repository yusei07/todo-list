// get main content dom
// get from dom.js the html element/components
// make the current tab on the sidebar different text & bg color (indicating that the user is on the current tab)
import { ToDo } from './task.js';
import { getCompletedTasks, completedTaskCount } from './handlers.js';
import { displayTaskCount } from './dom.js';


// render pages just like the restaurant project
// const todoContainer = document.querySelector("#todo-container");

export const displayHome = (container) => {
  document.querySelector("#home-page").addEventListener("click", () => {
    container.innerHTML = "";
    ToDo.renderToDo("todo-container", ToDo.tasksArray)
    displayTaskCount(ToDo.taskCount);
    // feather.replace();
  })
}

// export const displayToday = (container) => {}
// export const displayThisWeek = (container) => {}

export const displayImportant = (container) => {
  container.innerHTML = "";
}
// export const displayCompleted = (container) => {}

export const displayCompleted = (container) => {
  document.querySelector("#completed-page").addEventListener("click", () => {
    // clear the task container content
    container.innerHTML = "";
    // load completed tasks
    ToDo.renderToDo("todo-container", getCompletedTasks())
    displayTaskCount(completedTaskCount());
  })
}


// export const displayFolder = (container) => {}
// export const displayNotes = (container) => {}
