import { toDoContainer } from './dom.js';

// let myLibrary = [
//   {title: "The Meditations", author: "Marcus Aurelius", status: "Read"},
//   {title: "Ego Is the Enemy", author: "Ryan Holiday", status: "Not read"},
//   {title: "The Alchemist", author: "Paulo Coelho", status: "Read"}
// ];
// {title: "water da plants", description: "idk", date: "July 19 2005", priority: "high", taskIndex: null}

export class ToDo {
  constructor(title, description, date, priority, taskIndex) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.taskIndex = taskIndex;
    this.completed = false;
  }

  static tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];

  isNotEmpty() {
    // check if title & desc is empty
    if ($title.value.length === 0 || $description.value.length === 0) {
      alert("Please, fill all the fields");
    }
  }

  // set date(newDate) {
  //   this.dueDate =
  //     typeof newDate === "string"
  //       ? parse(newDate, "yyyy-MM-dd", new Date())
  //       : newDate;
  // }

  // get date() {
  //   return this.dueDate;
  // }
  //
  // get dateString() {
  //   return isValid(this.date) ? format(this.date, "yyyy-MM-dd") : "";
  // }

  static get taskCount() {
    return ToDo.tasksArray.length;
  }

  static isEnteredDateValid(dateToCheck) {
    return isMatch(dateToCheck, "yyyy-MM-dd");
  }

  getFormattedDate() {
    return isValid(this.date) ? format(this.date, "EEEE dd MMM y") : "";
  }

  addToDo() {
    // add toDo to the array
   ToDo.tasksArray.push(this);
    localStorage.setItem("tasks", JSON.stringify(ToDo.tasksArray))
  }

  static renderToDo() {
    const $ToDoBody = document.querySelector("#todo-container");
    $ToDoBody.innerHTML = "";
    // render all todo in array & assign values to it
    ToDo.tasksArray.forEach((task, index) => {
      $ToDoBody.insertAdjacentHTML("beforeend", toDoContainer(task.title, task.date, index));
    });
    console.log(ToDo.tasksArray)
  }
}


// checkBox.addEventListener('change', function() {
//   labelText.style.textDecoration = checkBox.checked ? 'line-through' : 'none';
// });

