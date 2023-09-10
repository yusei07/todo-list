import { folderHTML } from './dom.js';

// folder class here
export class Folder {
  constructor(title, folderIndex) {
    this.title = title;
    this.folderIndex = folderIndex;
  }

  static foldersArray = JSON.parse(localStorage.getItem("folders")) || [

  ]

  static folderTasks = JSON.parse(localStorage.getItem("folder-task")) || [
  ]

  addFolder() {
    Folder.foldersArray.push(this);
    localStorage.setItem("folders", JSON.stringify(Folder.foldersArray))
  }

  static deleteFolder(folderIndex) {
    if (folderIndex > -1) {
      Folder.foldersArray.splice(folderIndex, 1);
      localStorage.setItem("folders", JSON.stringify(Folder.foldersArray));
      Folder.renderFolders();
    }
  }

  // editFolder() {
  //
  // }

  // renderTasks() {
  //
  // }

  // render() {
  //   const $folder = document.querySelector("#folder-container");
  //   $folder.insertAdjacentHTML("beforeend", folderHTML(this.title));
  // }

  static renderFolders() {
    const $folder = document.querySelector("#folder-container");
    $folder.innerHTML = "";
    Folder.foldersArray.forEach((folder) => {
      $folder.insertAdjacentHTML("beforeend", folderHTML(folder.title));
      // folder.render();
    })
  }
}
