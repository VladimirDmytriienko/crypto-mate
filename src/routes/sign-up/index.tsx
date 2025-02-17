import { createFileRoute } from '@tanstack/react-router'
import AuthForm from '../../components/AuthForm/AuthForm'

export const Route = createFileRoute('/sign-up/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <AuthForm mode='signup' />
  </div>
}
