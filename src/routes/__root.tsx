import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className="min-h-screen bg-zinc-950 dark:bg-white flex flex-col items-center">
        <nav className="bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/20 dark:border-black/20 text-white rounded-full px-4 py-2 flex space-x-4 shadow-lg text-sm mt-4">
          <Link to="/about" className="text-gray-300 hover:text-white transition">
            About
          </Link>
          <Link to="/sign-in" className="text-gray-300 hover:text-white transition">
            Sign In
          </Link>
          <Link to="/sign-up" className="text-gray-300 hover:text-white transition">
            Sign Up
          </Link>
        </nav>
        <div className="text-gray-300 hover:text-white pt-12">
          <Outlet />
        </div>
      </div>
      {import.meta.env.MODE === 'development' && (<TanStackRouterDevtools position="bottom-left" />)}
    </React.Fragment>
  )
}