import { folderHTML } from './dom.js';

// folder class here
export class Folder {
  constructor(title, folderIndex) {
    this.title = title;
    this.folderIndex = folderIndex;
  }

  static foldersArray = JSON.parse(localStorage.getItem("folders")) || []

  // create 2d arr (folderTasks[0])
  static folderTasks = JSON.parse(localStorage.getItem("folder-task")) || [
    // 0
    // [
    //   {
    //     title: "Folder Task 1",
    //     description: "This is the first default task.",
    //     dueDate: "2023-08-29",
    //     priority: "high",
    //     completed: false,
    //   },
    //   {
    //     title: "Folder Child Task 1",
    //     description: "This is the first default task.",
    //     dueDate: "2023-08-29",
    //     priority: "high",
    //     completed: false,
    //   },
    // ],
    // 1
    // [
    //   {
    //     title: "Folder Task 1",
    //     description: "This is the second default task.",
    //     dueDate: "2023-08-30",
    //     priority: "medium",
    //     completed: false,
    //   },
    // ],
    // // 2
    // [
    //   {
    //     title: "Folder Task 3",
    //     description: "This is the second default task.",
    //     dueDate: "2023-08-30",
    //     priority: "medium",
    //     completed: false,
    //   },
    // ],
  ]

  // when user adds a folder
  // u also want to add an empty array to the folder.foldertasks (making it a 2d arr)
  // from there u can add object of the task inside of it
  addFolder() {
    Folder.foldersArray.push(this);
    localStorage.setItem("folders", JSON.stringify(Folder.foldersArray))
    Folder.folderTasks.push([]);
    localStorage.setItem("folder-task", JSON.stringify(Folder.folderTasks))
    console.log(Folder.folderTasks);
  }

  // addFolderTask(index) {
  //   Folder.folderTasks[index].push(task);
  //   localStorage.setItem("folder-task", JSON.stringify(Folder.folderTasks))
  // }

  static deleteFolder(folderIndex) {
    if (folderIndex > -1) {
      Folder.foldersArray.splice(folderIndex, 1);
      localStorage.setItem("folders", JSON.stringify(Folder.foldersArray));
      // TODO: you also want to delete the corresponding task of the folder
      Folder.folderTasks[folderIndex].splice(folderIndex, 1);
      localStorage.setItem("folderTasks", JSON.stringify(Folder.folderTasks));
      Folder.renderFolders();
    }
  }

  // editFolder() {
  //
  // }

  // renderTasks() {
  //
  // }

  static renderFolders() {
    const $folder = document.querySelector("#folder-container");
    $folder.innerHTML = "";
    Folder.foldersArray.forEach((folder, index) => {
      $folder.insertAdjacentHTML("beforeend", folderHTML(folder.title, index));
      // folder.render();
    })
  }
}
