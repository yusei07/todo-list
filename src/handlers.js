import { ToDo } from './task.js';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { showInfoModal, dynamicModal, displayTaskCount } from './dom.js';

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

// TODO: make another todo method
// load on each tab and pass in the corresponding array 
const checkCheckbox = (array) => {
  array.forEach(task => {
    if (task.completed === true) {
      // need to grab the id of the element to grab the checkbox and title
      const targetTaskEl = document.querySelector(`#todo-element-${task}`)
      const targetCheckbox = targetTaskEl.querySelector('input[type="checkbox"]')
      const targetTitle = targetCheckbox.nextElementSibling;
      // apply check style
    }
  });
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

// TODO: make todo features handlers as a function
// it should be able to be used dynamically on different page
// different page == different array

// todo features handler
export const toDoFeatureHandler = (array) => {
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
      const currentEditTask = array[editTaskIndex];

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
      console.log("Current task index:", infoTaskIndex);
      const currentTask = array[infoTaskIndex];
      console.log("Current task arr:", currentTask);

      // assign value to modal
      const infoModalContent = showInfoModal(currentTask.title, currentTask.description, currentTask.dueDate, currentTask.priority);
      console.log("Current task title:", currentTask.title);

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
}

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

export const closeModal = (existingModal) => {
  if (existingModal) {
    existingModal.remove();
  }
}

export const getFormDOM = () => {
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
