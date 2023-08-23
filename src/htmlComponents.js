export const toDoContainer = (title, date) => {
  const toDoElement = `
  <div class="flex flex-row items-center justify-between border-b border-semiGray py-5">
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
