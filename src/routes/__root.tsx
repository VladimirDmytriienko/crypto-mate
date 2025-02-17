import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className="min-h-screen bg-slate-200 dark:bg-stone-900 transition-colors duration-200">
        <nav className="p-4">
          <Link
            to="/about"
            className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
          >
            About
          </Link>
          <Link
            to="/sign-in"
            className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
          >
            sign-in
          </Link>
          <Link
            to="/sign-up"
            className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
          >
            sign-up
          </Link>
        </nav>
        <div className="p-4 text-gray-900 dark:text-white">
          <div>Hello "__root"!</div>
          <Outlet />
        </div>
      </div>
      {import.meta.env.MODE === 'development' && (<TanStackRouterDevtools position="bottom-left" />)}
    </React.Fragment>
  )
}