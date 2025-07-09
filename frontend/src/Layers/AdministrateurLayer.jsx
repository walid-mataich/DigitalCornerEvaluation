import React from 'react'

function AdministrateurLayer() {
  return (
    <div>
        <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button"
  className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-green-600 rounded-lg sm:hidden hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:text-white dark:hover:bg-green-800 dark:focus:ring-green-600">
  <span className="sr-only">Open sidebar</span>
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75z" />
  </svg>
</button>


<aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
  <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r border-green-200 dark:bg-green-900 dark:border-green-600">
    <ul className="space-y-2 font-medium">
        
      <li>
        <a href="#" className="flex items-center p-2 text-green-600 rounded-lg hover:bg-green-100 dark:text-white dark:hover:bg-green-800">
          <svg className="w-5 h-5 text-green-600 dark:text-white group-hover:text-green-800 dark:group-hover:text-green-200" fill="currentColor" viewBox="0 0 22 21">
            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
          </svg>
          <span className="ms-3">Dashboard</span>
        </a>
      </li>

      <li><a href="#" className="flex items-center p-2 text-green-600 hover:bg-green-100 rounded-lg dark:text-white dark:hover:bg-green-800"><span className="ms-3">Administrareurs</span></a></li>
      <li><a href="#" className="flex items-center p-2 text-green-600 hover:bg-green-100 rounded-lg dark:text-white dark:hover:bg-green-800"><span className="ms-3">Centres</span></a></li>
      <li><a href="#" className="flex items-center p-2 text-green-600 hover:bg-green-100 rounded-lg dark:text-white dark:hover:bg-green-800"><span className="ms-3">Profile</span></a></li>
      <li><a href="#" className="flex items-center p-2 text-green-600 hover:bg-green-100 rounded-lg dark:text-white dark:hover:bg-green-800"><span className="ms-3">Se déconnecter</span></a></li>
    </ul>
  </div>
</aside>



    </div>
  )
}

export default AdministrateurLayer