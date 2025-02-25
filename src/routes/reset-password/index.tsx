import ResetPassword from '@/components/ResetPassword/ResetPassword'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reset-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><ResetPassword /> </div>
}
