import { ToDo } from './task.js';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

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

// handle status -> important & completed

export const getCompletedTasks = () => {
  // init complete arr
  const arrCompleted = [];

  for (let i = 0; i < ToDo.tasksArray.length; i++) {
    if (ToDo.tasksArray[i].completed === true) {
      arrCompleted.push(ToDo.tasksArray[i]);
      // console.log("completed array", arrCompleted)
    }
  }

  return arrCompleted;
}

export const completedTaskCount = () => {
  return getCompletedTasks().length;
}

export function getImportantTasks() {
  const arrImportant = [];

  for (let i = 0; i < ToDo.tasksArray.length; i++) {
    if (ToDo.tasksArray[i].priority === "high") {
      arrImportant.push(ToDo.tasksArray[i]);
      console.log(arrImportant);
    }
  }

  return arrImportant;
}

// handle filter -> today & this week

export const getToday = () => {
  const arrToday = [];

  // get todays date
  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');

  // compare today's date with all obj date inside the arr
  for (let i = 0; i < ToDo.tasksArray.length; i++) {
    if (ToDo.tasksArray[i].dueDate === formattedToday) {
      arrToday.push(ToDo.tasksArray[i]);
    }
  }

  return arrToday;
}

export const getThisWeek = (tasks) => {
  const currentWeekTasks = [];

  // Get the start and end dates for the current week
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today);
  const endOfCurrentWeek = endOfWeek(today);

  // Iterate through tasks and filter those within the current week
  tasks.forEach((task) => {
    const taskDate = new Date(task.dueDate); // Assuming each task has a "date" property
    if (isWithinInterval(taskDate, { start: startOfCurrentWeek, end: endOfCurrentWeek })) {
      currentWeekTasks.push(task);
    }
  });

  return currentWeekTasks;
};
