import { createFileRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/"!


      {import.meta.env.MODE === 'development' && (<TanStackRouterDevtools position="bottom-left" />)}
    </div>
  )
}
