import NewPassword from '@/components/NewPassword/NewPassword'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/update-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><NewPassword /></div>
}
