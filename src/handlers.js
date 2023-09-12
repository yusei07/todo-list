import { ToDo } from './task.js';

export const saveCheckboxState = (checkboxId, isChecked) => {
  localStorage.setItem(checkboxId, isChecked); // e.g  1 : true
}

export const loadCheckboxState = (checkboxId) => {
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

export const checkboxListener = () => {
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
}

export const checkCheckboxState = () => {
  const allTask = document.querySelectorAll('#todo-container input[type="checkbox"]');
  allTask.forEach(checkbox => {
    loadCheckboxState(checkbox.id);
  })
}

const $todoContainer = document.querySelector("#todo-container");
// handle status -> important & completed

export function loadCompletedTasks() {
  // init complete arr
  const arrCompleted = [];

  for (let i = 0; i < ToDo.tasksArray.length; i++) {
    if (ToDo.tasksArray[i].completed === true) {
      arrCompleted.push(ToDo.tasksArray[i]);
      console.log("completed array", arrCompleted)
      // console.log("completed task:", ToDo.tasksArray[i]);
    }
  }
}

// export function loadImportantTasks() {
//
// }


// handle filter -> today & this week
