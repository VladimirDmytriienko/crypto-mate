import { createFileRoute } from '@tanstack/react-router'
import AuthForm from '../../components/AuthForm/AuthForm';

export const Route = createFileRoute('/sign-in/')({
  component: RouteComponent,
})

function RouteComponent() {

  return <div>
    <AuthForm mode='signin' />
  </div>
}
