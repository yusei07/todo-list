import { ToDo } from "./task.js";

export const toDoContainer = (title, date, taskIndex, taskId) => {
  const toDoElement = `
  <div id="todo-element-${taskIndex}" class="flex flex-row items-center justify-between border-b border-semiGray py-5">
    <!-- checkbox & title -->
    <div class="flex flex-row items-center gap-2">
      <input type="checkbox" id="${taskIndex}" class="check-btn" data-index="${taskIndex}" autocomplete="off">
      <span id="task-title" class="text-semiBlack text-sm font-medium dark:text-white">${title}</span>
    </div>
    <!-- details/due date/edit/delete -->
    <div class="flex flex-row items-center gap-4">
      <span class="text-semiBlack dark:text-white text-sm">${date}</span>
      <i id="info-btn" data-taskid=${taskId} data-index="${taskIndex}" data-feather="info" class="cursor-pointer w-5 h-5 text-secondary hover:text-semiBlack transition duration-300 stroke-[2] dark:text-white"></i>
      <i id="edit-btn" data-taskid=${taskId} data-index="${taskIndex}" data-feather="edit-3" class="cursor-pointer w-5 h-5 text-secondary hover:text-semiBlack transition duration-300 stroke-[2] dark:text-white"></i>
      <i id="del-btn" data-taskid=${taskId} data-index="${taskIndex}" data-feather="x" class="delete-btn cursor-pointer w-5 h-5 text-secondary hover:text-semiBlack transition duration-300 stroke-[2] dark:text-white"></i>
    </div>
  </div>`;

  return toDoElement;
}


export const folderHTML = (title, folderIndex) => {
  const folderElement = `<div id="folder-element" class="folder rounded-md hover:bg-semiGray transition duration-300 px-4 py-2 font-medium text-md text-secondary flex flex-row items-center gap-2 justify-between" folder-data-index="${folderIndex}">
              <div class="flex flex-row items-center gap-2">
                <i data-feather="folder" class="w-4 h-4 text-secondary stroke-[2]"></i>
                <span>${title}</span>
              </div>
              <div class="flex flex-row items-center gap-2">
                <i data-feather="edit" id="folder-edit-btn" class="cursor-pointer hover:text-semiBlack transition duration-300 w-4 h-4 text-secondary stroke-[2]" folder-data-index="${folderIndex}"></i>
                <i data-feather="trash-2" id="folder-del-btn" class="cursor-poitner hover:text-semiBlack transition duration-300 w-4 h-4 text-secondary stroke-[2]" folder-data-index="${folderIndex}"></i>
              </div>
            </div>`;

  return folderElement;
}

export const folderModal = (folderTitle, inputTitle) => {
  const folderModalElement = `<!-- folder input modal -->
        <dialog id="folder_modal" class="modal">
          <form id="folder-form" method="dialog" class="modal-box bg-[#F7F7F5] dark:bg-[#202020]">
            <!-- <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-semiBlack dark:text-white">✕</button> -->
            <div class="flex flex-col gap-6">
              <h3 class="font-semibold text-semiBlack dark:text-white text-lg">${folderTitle}</h3>
              <div class="flex flex-col gap-2">
                <label for="title" class="text-semiBlack dark:text-white font-medium">Title</label>
                <input id="folder-title" type="text" class="border border-semiGray rounded-md bg-transparent text-semiBlack pl-2 focus:ring-0 dark:text-white" value="${inputTitle}" required>
              </div>

              <div class="flex flex-row items-center gap-2 ml-auto">
                <button class="btn" onclick="folder_modal.close()">Cancel</button>
                <input type="submit" value="Add" class="btn text-white bg-softGreen px-6 border-none">
              </div>
            </div>

          </form>
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>`;

  return folderModalElement;
}

export const alertMessageHTML = `<div class="alert alert-warning">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  <span>Warning: Invalid email address!</span>
</div>`;

// add task/edit modal
export const dynamicModal = (formID, modalTitle, titleInput, descInput, dateInput, buttonValue) => {
  const modalElement = `<!-- todo input modal -->
            <dialog id="todo_modal" class="modal">
              <form id="${formID}" method="dialog" class="modal-box bg-[#F7F7F5] dark:bg-[#202020] text-semiBlack dark:text-white">
                <!-- <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-semiBlack dark:text-white">✕</button> -->
                <div class="flex flex-col gap-6">
                  <h3 class="font-semibold text-lg">${modalTitle}</h3>

                  <div class="grid grid-cols-1 gap-4">
                    <div class="flex flex-col gap-2">
                      <label for="title" class="font-medium">Title</label>
                      <input value="${titleInput}" id="title" type="text" placeholder="Your task" class="border border-semiGray rounded-md bg-transparent pl-2 focus:ring-0" required>
                    </div>
                    <div class="flex flex-col gap-2">
                      <label for="description" class="font-medium">Description</label>
                      <textarea id="desc" placeholder="Describe your task..." class="border border-semiGray rounded-md bg-transparent pl-2 focus:ring-0" required>${descInput}</textarea>
                    </div>
                    <div class="flex flex-col gap-2">
                      <label for="date" class="font-medium">Due Date</label>
                      <input value="${dateInput}" type="date" id="date" class="border border-semiGray rounded-md bg-transparent pl-2 focus:ring-0" required>
                    </div>
                    <div class="flex flex-col gap-2">
                      <label for="status" class="font-medium">Priority</label>
                      <select name="status" id="status" class="border border-semiGray rounded-md bg-transparent pl-2 focus:ring-0">
                        <option value="high">important</option>
                        <option value="medium">not so important</option>
                        <option value="low">very not important</option>
                      </select>
                    </div>
                  </div>
                  <div class="flex flex-row items-center gap-2 ml-auto">
                    <button class="btn" onclick="folder_modal.close()">Cancel</button>
                    <input type="submit" value="${buttonValue}" class="btn text-white bg-softGreen px-6 border-none">
                  </div>
                </div>

              </form>
              <form method="dialog" class="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>`;

  return modalElement;
}

export const showInfoModal = (title, description, date, priority) => {
  const infoModalELement = `
        <dialog id="info_modal" class="modal">
          <form method="dialog" class="modal-box bg-[#f7f7f5] dark:bg-[#202020] text-semiBlack dark:text-white">
            <div class="flex flex-col gap-6">
              <h3 class="font-semibold text-lg">Task Info</h3>
              <div class="flex flex-row gap-2">
                <label class="font-medium w-24 pr-2">Title</label>
                <h3>${title}</h3>
              </div>

              <div class="flex flex-row gap-2">
                <label class="font-medium w-24 pr-2">Description</label>
                <p>${description}</p>
              </div>

              <div class="flex flex-row gap-2">
                <label class="font-medium w-24 pr-2">Due Date</label>
                <span>${date}</span>
              </div>

              <div class="flex flex-row gap-2">
                <label class="font-medium w-24 pr-2">Priority</label>
                <span>${priority}</span>
              </div>

            </div>
          </form>
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>`;

  return infoModalELement;
}

// dark mode toggle
export const toggleDarkMode = () => {
  const checkbox = document.querySelector('#toggle');
  const html = document.querySelector('html');

  checkbox.addEventListener('click', () => {
    checkbox.checked ? html.classList.add('dark') : html.classList.remove('dark');
  })
}

// time based greeting
export const timeGreeting = () => {
  const greetings = ["Good morning", "Good afternoon", "Good evening"];
  const currentHour = new Date().getHours();

  let index = currentHour >= 12 && currentHour < 17 ? 1 : currentHour >= 17 ? 2 : 0;
  const currentGreetTime = greetings[index];

  const greetTextEl = document.querySelector("#subtext");
  greetTextEl.innerText = `Hey there! ${currentGreetTime}, Hope you're doing well >_<`
}

// dynamic date
export const dynamicDate = () => {
  const getCurrentDate = new Date().toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric"}) 
  const currentDateEl = document.querySelector("#current-date");
  currentDateEl.innerText = getCurrentDate
}

// TODO: make it reusable, so it can be used on diff pages to display the task count
// display task count
export const displayTaskCount = (taskCount) => {
  const $totalTask = document.querySelector("#total-task");
  $totalTask.innerText = `Tasks (${taskCount})`
}

// display alert msg
// alertMessageHTML.display()

// drawer toggle
// const $drawer = document.querySelector("#my-drawer-2");
// const $drawerMain = document.querySelector("#main-drawer");

// $drawer.addEventListener("change", () => {
//   $drawer.parentNode.classList.remove("lg:drawer-open");
//   $drawer.parentNode.classList.add("lg:drawer-close");
// })

// remove highlight from all the tabs with the same class name
// get the current clicked element id and add the class style of current folder to it
export const highlightCurrentTab = (currentElementClicked) => {
  const allTabs = document.querySelectorAll(".page");
  allTabs.forEach(tab => {
    tab.classList.remove('bg-tabHighlight', 'text-semiPink');
  });

  currentElementClicked.classList.add('bg-tabHighlight', 'text-semiPink');
}
