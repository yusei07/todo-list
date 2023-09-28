// header html 
// sidebar html 
// topbar html 

export const defaultHTML = `<div class="drawer lg:drawer-open" id="main-drawer"> <!-- change to lg:drawer-close when ur done modifying sidebar -->
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content px-4 py-6 md:px-6 lg:px-12 relative h-screen">

          <!-- navbar -->
          <nav class="flex flex-row justify-between items-center">
            <!-- toggle sidebar on sm -->
            <label for="my-drawer-2" class="btn drawer-button bg-transparent border-none p-0 hover:bg-transparent"><i data-feather="sidebar" class="w-6 h-6 text-black stroke-[2] dark:text-white"></i></label>

            <div class="flex flex-row items-center gap-2">
              <label class="swap swap-rotate bg-transparent p-2">

                <!-- this hidden checkbox controls the state -->
                <input type="checkbox" id="toggle" class="hidden"/>

                <!-- sun icon -->
                <svg class="swap-off fill-black w-6 h-6 stroke-[1]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>

                <!-- moon icon -->
                <svg class="swap-on fill-white w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>

              </label>


              <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn text-white font-light px-6 m-1 dark:bg-white dark:text-black">Share</label>
                <div tabindex="0" class="dropdown-content z-[1] card card-compact w-max p-0 shadow bg-white text-black dark:bg-[#202020] dark:text-white">
                  <div class="card-body w-full">
                    <h3 class="card-title">Share with</h3>
                    <div class="flex flex-row items-center gap-2 mb-2">
                      <div class="avatar">
                        <div class="w-10 rounded-full">
                          <img src="./assets/share-pfp1.jpeg" class="object-cover" loading="lazy"/>
                        </div>
                      </div>
                      <div class="avatar">
                        <div class="w-10 rounded-full">
                          <img src="./assets/share-pfp2.jpeg" class="object-cover" loading="lazy"/>
                        </div>
                      </div>
                      <div class="avatar">
                        <div class="w-10 rounded-full">
                          <img src="./assets/share-pfp3.jpeg" class="object-cover" loading="lazy"/>
                        </div>
                      </div>
                      <div class="avatar">
                        <div class="w-10 rounded-full bg-semiGray relative">
                          <i data-feather="search" class="absolute top-3 right-[30%] w-4 h-4 text-black dark:text-white stroke-[3]"></i>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col gap-2">
                      <div class="flex flex-row items-center gap-2">
                        <div class="avatar">
                          <div class="rounded-full bg-semiGray relative w-10">
                            <i data-feather="circle" class="absolute top-3 right-[30%] w-4 h-4 text-black dark:text-white stroke-[3]"></i>
                          </div>
                        </div>
                        <div class="flex flex-col">
                          <span class="font-semibold">Dennis x June</span>
                          <span>30m - calen.co</span>
                        </div>
                      </div>
                      <div class="flex flex-row items-center gap-2">
                        <div class="avatar">
                          <div class="rounded-full bg-semiGray relative w-10">
                            <i data-feather="circle" class="absolute top-3 right-[30%] w-4 h-4 text-black dark:text-white stroke-[3]"></i>
                          </div>
                        </div>
                        <div class="flex flex-col">
                          <span class="font-semibold">Team onboarding</span>
                          <span>60m - calen.co</span>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-row items-center mt-2 bg-semiGray h-fit rounded-md">
                      <div class="flex flex-col gap-1 h-full py-1 px-3">
                        <span class="font-semibold text-sm">Create share link</span>
                        <span class="text-sm">Share all, or specific slots</span>
                      </div>
                      <div class="btn px-8 text-white font-light hover:bg-transparent">New</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="avatar">
                <div class="w-12 rounded-full">
                  <img src="./assets/profile-img.jpeg" class="object-cover"/>
                </div>
              </div>

            </div>
          </nav>

          <!-- header -->
          <div class="flex flex-col gap-1 pt-8">
            <h1 class="text-black font-semibold text-3xl dark:text-[#d4d4d4]" id="current-date"></h1>
            <h1 class="text-gray-600 dark:text-white" id="subtext"></h1>
          </div>

          <!-- main content -->
          <main id="main-container" class="flex flex-col pt-12">
            <div class="border-b flex flex-row items-center justify-between pb-2 px-2">
              <h1 class="text-semiBlack text-lg font-semibold dark:text-[#d4d4d4]" id="total-task"></h1>
              <button id="add-todo" class="bg-transparent border-none hover:bg-semiGray p-3 rounded-md transition duration-300 dark:hover:bg-gray-400"><i data-feather="plus" class="w-4 h-4 text-semiBlack stroke-[3] dark:text-[#d4d4d4]"></i></button>
            </div>

            <!-- todo output -->
            <div class="flex flex-col jusitfy-center px-2" id="todo-container"></div>

          </main>


          <!-- help/support -->
          <div class="fixed bottom-4 right-4 md:right-6 lg:right-12">
            <div class="dropdown dropdown-top dropdown-end">
              <label tabindex="0" class="btn m-1 bg-transparent hover:bg-semiGray hover:border-semiGray border border-semiGray px-[1.15rem] py-2 rounded-full shadow-md text-semiBlack text-lg font-medium dark:text-white dark:bg-[#202020] dark:border-none">?</label>
              <div class="dropdown-content card card-compact w-max z-[1] p-0 shadow bg-white text-black dark:bg-[#202020]">
                <div class="card-body w-60">
                  <div class="card-title">
                    <i data-feather="book-open" class="w-4 h-4 text-semiBlack dark:text-white stroke-[3]"></i>
                    <h3 class="font-semibold text-semiBlack dark:text-white text-lg">Help</h3>
                  </div>
                  <p class="dark:text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel non blanditiis cum accusamus ex recusandae facilis maiores placeat, animi ipsam, suscipit fugiat voluptatibus! Blanditiis veniam, adipisci explicabo deserunt possimus quas!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- sidebar -->
        <div class="drawer-side">
          <label for="my-drawer-2" class="drawer-overlay"></label> 
          <ul class="menu w-80 h-full bg-[#F7F7F5] dark:bg-[#202020] text-base-content gap-5 p-5">
            <!-- Sidebar content here -->
            <div class="flex flex-row items-center justify-between h-fit">
              <h1 class="text-2xl font-semibold text-black dark:text-white">Todos</h1>
              <div class="flex flex-row items-center gap-2">
                <!-- <label for="my-drawer-2" class="hover:bg-semiGray transition duration-300 border-none p-2 rounded-md"><i data-feather="coffee" class="w-4 h-4 text-semiBlack stroke-[3]"></i></label> -->
                <label for="my-drawer-2" class="hover:bg-semiGray transition duration-300 border-none p-2 rounded-md"><i data-feather="more-horizontal" class="w-4 h-4 text-semiBlack stroke-[3] dark:text-white"></i></label>
              </div>
            </div>

            <div class="flex flex-col gap-2" id="main-category">

              <h1 class="text-semiBlack font-semibold text-md dark:text-white">Index</h1>

              <ul class="menu w-full rounded-box p-0 flex flex-col gap-2">
                <li id="home-page" class="page rounded-md hover:bg-semiGray transition duration-300 font-medium text-md text-semiPink bg-tabHighlight">
                  <a class="flex flex-row items-center"><i data-feather="home" class="w-4 h-4 text-secondary stroke-[2]"></i>Home</a>
                </li>
                <li>
                  <details open>
                    <summary class="font-medium text-md text-secondary">
                      <i data-feather="filter" class="w-4 h-4 text-secondary stroke-[2]"></i>
                      Filter
                    </summary>
                    <ul>
                      <li id="today-page" class="page rounded-md hover:bg-semiGray transition duration-300 font-medium text-md text-secondary"><a><i data-feather="calendar" class="w-4 h-4 text-secondary stroke-[2]"></i>Today</a></li>
                      <li id="week-page" class="page rounded-md hover:bg-semiGray transition duration-300 font-medium text-md text-secondary"><a><i data-feather="archive" class="w-4 h-4 text-secondary stroke-[2]"></i>This week</a></li>
                    </ul>
                  </details>
                </li>
                <li>
                  <details open>
                    <summary class="font-medium text-md text-secondary">
                      <i data-feather="bar-chart-2" class="w-4 h-4 text-secondary stroke-[2]"></i>
                      Status
                    </summary>
                    <ul>
                      <li id="important-page" class="page rounded-md hover:bg-semiGray transition duration-300 font-medium text-md text-secondary"><a><i data-feather="zap" class="w-4 h-4 text-secondary stroke-[2]"></i>Important</a></li>
                      <li id="completed-page" class="page rounded-md hover:bg-semiGray transition duration-300 font-medium text-md text-secondary"><a><i data-feather="check-square" class="w-4 h-4 text-secondary stroke-[2]"></i>Completed</a></li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>


            <div class="border-b border-semiGray"></div>
            <div class="flex flex-col gap-2">
              <h1 class="text-semiBlack font-semibold text-md dark:text-white">Personal</h1>
              <div id="notes-page" class="rounded-md hover:bg-semiGray transition duration-300 px-4 py-2 font-medium text-md text-secondary flex flex-row items-center gap-2">
                <i data-feather="book" class="w-4 h-4 text-secondary stroke-[2]"></i>
                <span>Notes</span>
              </div>
            </div>

            <div class="border-b border-semiGray"></div>
            <div class="flex flex-col gap-2">
              <div class="flex flex-row items-center justify-between">
                <h1 class="text-semiBlack font-semibold text-md dark:text-white">Folders</h1>
                <button id="add-folder" class="bg-transparent border-none hover:bg-semiGray p-2 rounded-md transition duration-300">
                  <i data-feather="plus" class="w-3 h-3 text-black dark:text-white stroke-[3]"></i>
                </button>
              </div>

              <div class="flex flex-col gap-2" id="folder-container"></div>

            </div>
          </ul>

        </div> <!-- sidebar div -->
      </div> <!-- main div ( the whole div ) -->`;
