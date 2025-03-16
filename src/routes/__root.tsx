import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Nav from '@/components/Nav/Nav'
export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className="min-h-screen  bg-zinc-950 dark:bg-white flex flex-col items-center">
        <Nav />
        <div className="w-full max-w-7xl mx-auto px-2">
          <Outlet />
        </div>
      </div>
      {import.meta.env.MODE === 'development' && (<TanStackRouterDevtools position="bottom-left" />)}
    </React.Fragment>
  )
}