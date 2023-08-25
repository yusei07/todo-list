export const toDoContainer = (title, date, toDoIndex) => {
  const toDoElement = `
  <div class="flex flex-row items-center justify-between border-b border-semiGray py-5" data-index="${toDoIndex}">
    <!-- chekcbox & title -->
    <div class="flex flex-row items-center gap-2">
      <input type="checkbox">
      <span class="text-semiBlack text-sm font-medium">${title}</span>
    </div>
    <!-- details/due date/edit/delete -->
    <div class="flex flex-row items-center gap-4">
      <span class="text-semiBlack text-sm">${date}</span>
      <i data-feather="info" class="w-5 h-5 text-secondary hover:text-semiBlack transition duration-300 stroke-[2]"></i>
      <i data-feather="edit-3" class="w-5 h-5 text-secondary hover:text-semiBlack transition duration-300 stroke-[2]"></i>
      <i data-feather="x" class="w-5 h-5 text-secondary hover:text-semiBlack transition duration-300 stroke-[2]"></i>
    </div>
  </div>`;

  return toDoElement;
}

export const folderHTML = `<div class="rounded-md hover:bg-semiGray transition duration-300 px-4 py-2 font-medium text-md text-secondary flex flex-row items-center gap-2 justify-between">
              <div class="flex flex-row items-center gap-2">
                <i data-feather="folder" class="w-4 h-4 text-secondary stroke-[2]"></i>
                <span>acads</span>
              </div>
              <i data-feather="trash-2" class="w-4 h-4 text-secondary stroke-[2]"></i>
            </div>`;

export const alertMessageHTML = `<div class="alert alert-warning">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  <span>Warning: Invalid email address!</span>
</div>`;


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
  greetTextEl.innerText = `Hey there! ${currentGreetTime}, hope you're doing well >_<`
}

// dynamic date
export const dynamicDate = () => {
  const getCurrentDate = new Date().toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric"}) 
  const currentDateEl = document.querySelector("#current-date");
  currentDateEl.innerText = getCurrentDate
}

// display alert msg
// alertMessageHTML.display()
