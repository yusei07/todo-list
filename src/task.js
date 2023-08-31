import { toDoContainer } from './dom.js';
import { isWithinInterval, parse, format, isValid, isMatch } from "date-fns";

export class ToDo {
  constructor(title, description, date, priority, taskIndex) {
    this.title = title;
    this.description = description;
    this.dueDate = date;
    this.priority = priority;
    this.taskIndex = taskIndex;
    this.completed = false;
  }

  static tasksArray = JSON.parse(localStorage.getItem("tasks")) || [
    {
      title: "Default Task 1",
      description: "This is the first default task.",
      dueDate: "2023-08-29",
      priority: "high",
    },
    {
      title: "Default Task 2",
      description: "This is the second default task.",
      dueDate: "2023-08-30",
      priority: "medium",
    },
  ];

  set date(newDate) {
     this.dueDate =
       typeof newDate === "string"
         ? parse(newDate, "yyyy-MM-dd", new Date())
         : newDate;
  }

  get date() {
     return this.dueDate;
  }

  // get dateString() {
  //    return isValid(this.date) ? format(this.date, "yyyy-MM-dd") : "";
  // }

  // static isEnteredDateValid(dateToCheck) {
  //   return isMatch(dateToCheck, "yyyy-MM-dd");
  // }

  static getFormattedDate(date) {
    const dateInstance = new Date(date);
    return isValid(dateInstance) ? format(dateInstance, "MMM do") : "";
  }

  static get taskCount() {
    return ToDo.tasksArray.length;
  }

  isNotEmpty() {
    // check if title & desc is empty
    if ($title.value.length === 0 || $description.value.length === 0) {
      alert("Please, fill all the fields");
    }
  }

  addToDo() {
    // add toDo to the array
   ToDo.tasksArray.push(this);
    localStorage.setItem("tasks", JSON.stringify(ToDo.tasksArray))
  }

  static delete(taskIndex) {
    if (taskIndex > -1) {
      ToDo.tasksArray.splice(taskIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(ToDo.tasksArray));
      ToDo.renderToDo();
    }
  }

  // edit() {
    // checkBox.addEventListener('change', function() {
    //   labelText.style.textDecoration = checkBox.checked ? 'line-through' : 'none';
    // });
  // }

  // toggleComplete() {
  //
  // }

  static renderToDo() {
    const $ToDoBody = document.querySelector("#todo-container");
    $ToDoBody.innerHTML = "";
    // render all todo in array & assign values to it
    ToDo.tasksArray.forEach((task, index) => {
      const formattedDate = ToDo.getFormattedDate(task.dueDate || task.date); // Format the date using the method
      $ToDoBody.insertAdjacentHTML("beforeend", toDoContainer(task.title, formattedDate, index));
    });
    console.log(ToDo.tasksArray)
  }
}
